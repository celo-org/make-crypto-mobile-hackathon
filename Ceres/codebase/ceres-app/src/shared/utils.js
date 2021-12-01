export const roundTo = (n, digits) => {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(1000000000000000000000000, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
}