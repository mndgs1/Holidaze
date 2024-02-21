export function capitalizeFirstLetter(str: string) {
    // Check if the string is not empty
    if (str.length === 0) {
        return str;
    }
    // Concatenate the uppercase first letter with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
}
