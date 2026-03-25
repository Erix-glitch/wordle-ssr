import { Nav } from '@/components/nav';
import { getWordList } from '../Word.js';
import WordList from './word-list.js';

export default async function Page({ }) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 10); // load only ten words initially so its not (as) slow on first load
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
                <p className="text-sm text-foreground/50 mb-6 font-mono">History of Wordle answers</p>

                <WordList initialWords={words} />
            </main>
        </>
    )
}