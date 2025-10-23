// app/page.js
export default async function Page() {
  // build date string
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  // wordle api
  const url = `https://www.nytimes.com/svc/wordle/v2/${dateString}.json`;

  // fetch on server
  let solution = null;
  try {
    const res = await fetch(url, { cache: 'no-store' }); // no-store = fresh fetch daily
    if (res.ok) {
      const data = await res.json();
      solution = data.solution.toUpperCase();
    }
  } catch (error) {
    console.error('Failed to fetch Wordle:', error);
  }

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
              className="flex h-[62px] w-[62px] items-center justify-center bg-[#538d4e] text-4xl font-bold uppercase text-white shadow-[0_6px_0_rgba(0,0,0,0.25)]"
            >
              {letter}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-red-400">Could not load today's word.</p>
      )}
    </main>
  );
}
