export function isFutureDate(dateString: string): boolean {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    if (inputDate < currentDate) {
        return false;
    } else {
        return true;
    }
}
