'use client';

import { useState } from 'react';
import { DisplayWord } from '@/components/fancyword.js';
import { fetchMoreWords } from './actions.js';

export default function WordList({ initialWords }) {
    const [words, setWords] = useState(initialWords);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        setLoading(true);
        try {
            const oldestDate = words[words.length - 1]?.isoDate;
            if (!oldestDate) return;
            const moreWords = await fetchMoreWords(oldestDate, 50);
            setWords((prev) => [...prev, ...moreWords]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <ul className="list-none divide-y divide-foreground/10">
                {words.map((word, index) => (
                    <li key={index} className="flex items-center justify-between px-4 py-3 hover:bg-foreground/5 transition-colors rounded">
                        <DisplayWord word={word.solution} />
                        <span className="text-sm text-foreground/40 font-mono">{word.isoDate}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={loadMore}
                disabled={loading}
                className="mt-6 mb-8 w-full py-3 px-6 bg-foreground/10 hover:bg-foreground/20 text-foreground font-mono transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Load More'}
            </button>
        </div>
    );
}
