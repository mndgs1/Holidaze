import { format } from "date-fns";

export function formatToLongDate(dateString: string): string {
    const inputDate = new Date(dateString);
    const formattedDate = format(inputDate, "dd MMMM yyyy");
    return formattedDate;
}
