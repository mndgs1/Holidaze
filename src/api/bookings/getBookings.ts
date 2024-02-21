import { PROFILES_URL } from "../../constants/api";
import { Booking } from "../../constants/interfaces/booking";

export async function getBookings(token: string, name: string) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(
        `${PROFILES_URL}/${name}/bookings?_venue=true`,
        options
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    const bookings: Booking[] = json;
    return bookings;
}
