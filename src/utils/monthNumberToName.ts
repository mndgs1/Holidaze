export const monthNumberToName = (monthNumber: number) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // Adjust for zero-based index
    const index = monthNumber - 1;

    // Ensure the month number is within a valid range
    if (index >= 0 && index < monthNames.length) {
        return monthNames[index];
    } else {
        return "Invalid Month";
    }
};
