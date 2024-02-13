export function subtractDates(from: string, to: string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const timeDifference = toDate.getTime() - fromDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
}
