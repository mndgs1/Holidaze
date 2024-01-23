import { Profile } from "./property";
import { Property } from "./property";

export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue?: Property;
    customer?: Profile;
}

export interface CreateBookingData {
    dateFrom: "string"; // Required - Instance of new Date()
    dateTo: "string"; // Required - Instance of new Date()
    guests: 0; // Required
    venueId: "string"; // Required - The id of the venue to book
}
