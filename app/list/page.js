import { Nav } from '@/components/nav';
import { Word, getWordList } from '../Word.js';
import { DisplayWord } from '@/components/fancyword.js';
export default async function Page({ }) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 100);
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = new Date().toISOString().split('T')[0];
    const words = (await getWordList(startDateString, endDateString)).reverse();
    return (
        <>
            <Nav />
            <main className="flex flex-col items-center justify-center min-h-screen text-auto text-center px-6 py-12">
                <h1 className="text-2xl md:text-5xl font-bold tracking-tight mt-8 mb-2">
                    List of Words
                </h1>
                <p className="text-sm text-foreground/50 mb-6">Last 100 days of Wordle answers</p>

                <div className="w-full max-w-md">
                    <ul className="list-none divide-y divide-foreground/10">
                        {words.map((word, index) => (
                            <li key={index} className="flex items-center justify-between px-4 py-3 hover:bg-foreground/5 transition-colors rounded">
                                <DisplayWord word={word.solution} />
                                <span className="text-sm text-foreground/40 font-mono">{word.isoDate}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}