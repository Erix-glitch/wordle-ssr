export const getLocalDateIso = (date) => {
    const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localTime.toISOString().split('T')[0];
};

export const parseLocalDate = (value) => {
    if (typeof value !== 'string') {
        return null;
    }

    const parts = value.split('-').map(Number);
    if (parts.length !== 3) {
        return null;
    }

    const [year, month, day] = parts;
    if ([year, month, day].some(Number.isNaN)) {
        return null;
    }

    return new Date(year, month - 1, day);
};

export async function Word(dateString) {
    let targetDate = new Date();
    if (dateString) {
        const parsed = parseLocalDate(dateString);
        if (parsed) {
            targetDate = parsed;
        }
    }

    const isoDate = getLocalDateIso(targetDate);
    const url = `https://www.nytimes.com/svc/wordle/v2/${isoDate}.json`;

    let solution = null;
    let wordNum = null;
    let printDate = null;
    try {
        const res = await fetch(url, { next: { revalidate: 60 } });
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

    return { solution, wordNum, printDate, isoDate };
}
