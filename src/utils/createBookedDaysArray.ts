import { Property } from "../constants/interfaces/property";
import { Booking } from "../constants/interfaces/booking";

interface FormattedDate {
    year: number;
    month: number;
    day: number;
}

const formatDate = (date: Date): FormattedDate => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
});

const generateDateRange = (startDate: Date, endDate: Date): FormattedDate[] => {
    const formattedDates: FormattedDate[] = [];

    if (startDate > endDate) {
        return formattedDates;
    }

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        formattedDates.push(formatDate(currentDate));

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return formattedDates;
};

export const createBookedDaysArray = (data: Property) => {
    if (data.bookings.length === 0) {
        return;
    }

    const allBookedDatesArr: FormattedDate[] = [];
    data.bookings.forEach((booking: Booking) => {
        const fromDate = new Date(booking.dateFrom);
        const toDate = new Date(booking.dateTo);

        const dateRange = generateDateRange(fromDate, toDate);

        dateRange.forEach((date) => {
            allBookedDatesArr.push(date);
        });
    });
    return allBookedDatesArr;
};
