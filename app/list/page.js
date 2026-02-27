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
                <h1 className="text-2xl md:text-6xl font-bold tracking-tight drop-shadow-sm mt-8">
                    List of Words
                </h1>
                
                <div className="mt-8">
                    <ul className="list-none pl-5 pr-5 pt-2 pb-2 rounded border-2 border-solid">
                        {words.map((word, index) => (
                            <li key={index} className="flex items-center gap-2"><DisplayWord word={word.solution} /> — {word.isoDate}</li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}