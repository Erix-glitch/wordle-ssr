export async function Word() {
    // build date string
    const today = new Date();
    const localTime = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    const dateString = localTime.toISOString().split('T')[0]; // Local date in YYYY-MM-DD
    // wordle api
    const url = `https://www.nytimes.com/svc/wordle/v2/${dateString}.json`;

    // fetch on server
    let solution, wordNum, printDate = null;
    try {
        const res = await fetch(url, { next: { revalidate: 60 } }); // ISR: cache for 1 minute
        if (res.ok) {
            const data = await res.json();
            solution = data.solution;
            wordNum = data.days_since_launch;
            printDate = data.print_date;
        } else {
            console.error('Wordle API returned', res.status);
        }
    } catch (error) {
        console.error('Failed to fetch Wordle:', error);
    }
    return [solution, wordNum, printDate];
}
