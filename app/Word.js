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
    let apiError = null;
    try {
        const res = await fetch(url, { next: { revalidate: 60 } });
        let data = null;
        try {
            data = await res.json();
        } catch {
            data = null;
        }

        const isErrorStatus =
            data && typeof data === 'object' && data.status === 'ERROR';

        if (res.ok && !isErrorStatus && data) {
            solution = data.solution;
            wordNum = data.days_since_launch;
            printDate = data.print_date;
        } else {
            apiError =
                data && typeof data === 'object'
                    ? data
                    : {
                          status: 'ERROR',
                          errors: [`HTTP ${res.status}`],
                          results: [],
                      };
            console.error('Wordle API returned', res.status, apiError);
        }
    } catch (error) {
        console.error('Failed to fetch Wordle:', error);
        apiError = {
            status: 'ERROR',
            errors: [error instanceof Error ? error.message : String(error)],
            results: [],
        };
    }

    return { solution, wordNum, printDate, isoDate, apiError };
}
