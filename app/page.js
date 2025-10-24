// app/page.js
import { Word } from './Word.js';
export const revalidate = 86400; // revalidate every 24 hours

export default async function Page() {
  const [solution, wordNum, printDate] = await Word();

  // render html
  const letters = solution?.split('') ?? [];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#121213] text-white text-center px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight drop-shadow-sm">
        Today's Wordle word
      </h1>
      {solution ? (
        <div className="mt-10 flex space-x-1.5">
          {letters.map((letter, index) => (
            <div
              key={`${letter}-${index}`}
              className="flex h-[62px] w-[62px] items-center justify-center bg-[#538d4e] text-4xl font-bold uppercase text-white animate-flip"
              style={{ animationDelay: `${index * 0.25}s` }}
            >
              {letter}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-red-400">Could not load today's word.</p>
      )}
      <div className="mt-4">
        <p className="text-base text-gray-400 font-mono">Wordle #{wordNum}</p>
        <p className="text-sm text-gray-600">{printDate}</p>
      </div>
    </main>
  );
}
