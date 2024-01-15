import { Profile } from "./property";
import { Property } from "./property";

export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: Property;
    customer: Profile;
}
