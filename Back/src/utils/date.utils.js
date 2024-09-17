/**
 * Ajoute à une date un certain nombre de jours
 * @param {Date} date
 * @param {number} nbDays
 * 
 * @returns {Date}
 */
export const addDays = (date, nbDays) => {
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * nbDays);
    return date;
}

export const yearDiff = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    let years = d2.getFullYear() - d1.getFullYear();

    d1.setFullYear(d2.getFullYear());
    if(d1 > d2) {
        years--;
    }
    return years;
}