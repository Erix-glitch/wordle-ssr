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
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Today's Wordle word</h1>
      {solution ? (
        <p className="text-3xl text-green-400 font-serif font-bold">{solution}</p>
      ) : (
        <p className="text-red-400">Could not load today's word.</p>
      )}
    </main>
  );
}
