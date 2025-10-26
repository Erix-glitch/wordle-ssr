// app/page.js
import Link from 'next/link';
import { Word, getLocalDateIso, parseLocalDate } from './Word.js';
import { MoveLeft, MoveRight } from 'lucide-react';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const dateParam = typeof resolvedSearchParams.date === 'string' ? resolvedSearchParams.date : undefined;
  const { solution, wordNum, printDate, isoDate } = await Word(dateParam);

  const currentDate = parseLocalDate(isoDate) ?? new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  const prevDateString = getLocalDateIso(previousDate);
  const nextDateString = getLocalDateIso(nextDate);
  const todayString = getLocalDateIso(new Date());
  const isSpoiler = nextDateString > todayString;
  
  // render html
  const letters = solution?.split('') ?? [];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-auto text-center px-6 py-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm">
        Today's Wordle Word
      </h1>
      {solution ? (
        <div className="mt-8 flex space-x-1.5">
          {letters.map((letter, index) => (
            <div
              key={`${letter}-${index}`}
              className="flex h-[62px] md:h-[72px] md:w-[72px] w-[62px] items-center justify-center bg-[#538d4e] text-4xl md:text-[40px] font-wordle font-bold uppercase text-white animate-flip"
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
        <p className="flex gap-2 text-base text-gray-400 font-mono items-center">
          <Link
            className="p-1 rounded hover:bg-gray-800 transition-colors"
            aria-label="Previous Wordle"
            href={`/?date=${prevDateString}`}
          >
            <MoveLeft className="w-8" />
          </Link>
          Wordle #{wordNum}
          {isSpoiler ? (
            <span
              aria-disabled="true"
              className="p-1 rounded text-gray-600"
            >
              <MoveRight className="w-8" />
            </span>
          ) : (
            <Link
              className="p-1 rounded hover:bg-gray-800 transition-colors"
              aria-label="Next Wordle"
              href={`/?date=${nextDateString}`}
            >
              <MoveRight className="w-8" />
            </Link>
          )}
        </p>
        <p className="items-center text-sm text-gray-600 font-mono">
          {printDate}
        </p>
      </div>
    </main>
  );
}
