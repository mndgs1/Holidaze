import { Property } from "./property";
import { Booking } from "./booking";

export interface Profile {
    name: string;
    email: string;
    avatar: string;
    venueManager: false;
    venues?: Property[];
    bookings?: Booking[];
    _count: {
        venues: number;
        bookings: number;
    };
}
