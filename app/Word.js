export async function Word() {
    // build date string
    const today = new Date();
    const localTime = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    const dateString = localTime.toISOString().split('T')[0]; // Local date in YYYY-MM-DD
    // wordle api
    const url = `https://www.nytimes.com/svc/wordle/v2/${dateString}.json`;

    // fetch on server
    let solution = null;
    try {
    const res = await fetch(url, { next: { revalidate: 86400 } }); // ISR: cache for 1 day
    if (res.ok) {
        const data = await res.json();
        solution = data.solution;
    } else {
        console.error('Wordle API returned', res.status);
    }
    } catch (error) {
    console.error('Failed to fetch Wordle:', error);
    }
    return solution;
}