// app/page.js
import { Word, getLocalDateIso, parseLocalDate } from './Word.js';
import { WordleNavigation } from '@/components/wordle-navigation';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const dateParam = typeof resolvedSearchParams.date === 'string' ? resolvedSearchParams.date : undefined;
  const { solution, wordNum, printDate, isoDate, apiError, wordId} = await Word(dateParam);

  const currentDate = parseLocalDate(isoDate) ?? new Date();
  const previousDate = new Date(currentDate);
  previousDate.setDate(currentDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  const today = new Date();
  const isFutureDate = currentDate > today;

  const prevDateString = getLocalDateIso(previousDate);
  const nextDateString = getLocalDateIso(nextDate);
  const todayString = getLocalDateIso(new Date());
  const isViewingToday = isoDate === todayString;
  const apiErrorMessages = Array.isArray(apiError?.errors) ? apiError.errors : [];
  const isNotFoundError =
    apiError?.status === 'ERROR' && apiErrorMessages.includes('Not Found');
  const canAdvance = !isNotFoundError;
  const shouldShowSpoilerWarning = isViewingToday && canAdvance;
  const failureMessage = isNotFoundError
    ? 'No puzzle is available for this date yet.'
    : 'Could not load the Wordle word for this date.';
  
  // render html
  const letters = solution?.split('') ?? [];
  const error = "ERROR".split('');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-auto text-center px-6 py-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm">
        Today&apos;s Wordle Word
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
        <>
        <div className="mt-8 flex space-x-1.5">
          {error.map((letter, index) => (
            <div
              key={`${letter}-${index}`}
              className="flex h-[62px] md:h-[72px] md:w-[72px] w-[62px] items-center justify-center bg-[#a94f4f] text-4xl md:text-[40px] font-wordle font-bold uppercase text-white animate-flip"
              style={{ animationDelay: `${index * 0.25}s` }}
            >
              {letter}
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xl text-red-500">{failureMessage}</p>
        </>
      )}
      <WordleNavigation
        wordNum={wordNum}
        wordId={wordId}
        prevDateString={prevDateString}
        nextDateString={nextDateString}
        printDate={printDate ?? isoDate}
        isSpoiler={shouldShowSpoilerWarning}
        canAdvance={canAdvance}
      />
      {isFutureDate && (
        <p className="font-mono text-yellow-200 italic">
          Wordles in the future are subject to change.
        </p>
      )}

    </main>
  );
}
