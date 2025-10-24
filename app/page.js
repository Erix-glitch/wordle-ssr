// app/page.js
import { Word } from './Word.js';
import { MoveLeft, MoveRight } from 'lucide-react';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const [solution, wordNum, printDate] = await Word();

  // render html
  const letters = solution?.split('') ?? [];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-auto text-center px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight drop-shadow-sm">
        Today's Wordle Word
      </h1>
      {solution ? (
        <div className="mt-8 flex space-x-1.5">
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
      <div className="items-center mt-4">
        <p className="flex gap-2 text-base text-gray-400 font-mono">
          <MoveLeft className="w-8"></MoveLeft>
          Wordle #{wordNum}
          <MoveRight className="w-8"></MoveRight>
        </p>
        <p className="items-center text-sm text-gray-600 font-mono">
          {printDate}
        </p>
      </div>
    </main>
  );
}
