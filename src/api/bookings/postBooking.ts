import { BOOKINGS_URL } from "../../constants/api";
import { CreateBookingData, Booking } from "../../constants/interfaces/booking";

export async function postBooking(token: string, data: CreateBookingData) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data),
    };

    console.log(data);

    const response = await fetch(BOOKINGS_URL, options);

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    const booking: Booking = json;
    return booking;
}
