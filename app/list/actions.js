'use server';

import { getWordList } from '../Word.js';

export async function fetchMoreWords(endDateString, count = 50) {
    const endDate = new Date(endDateString);
    endDate.setDate(endDate.getDate() - 1); // start from the day before the last loaded date
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (count - 1));

    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const words = (await getWordList(startStr, endStr)).reverse();
    return words;
}
