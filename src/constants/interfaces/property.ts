import { Booking } from "./booking";

export interface Property {
    id: string;
    name: string;
    description: string;
    media: string[];
    price: number;
    maxGuests: number;
    rating?: number | 0;
    created?: string;
    updated?: string;
    meta: Amenities;
    location: Location;
    bookings: Booking[];
    owner?: Profile;
}

export interface Profile {
    name: string;
    email: "user@example.com";
    avatar?: string;
}

export interface Location {
    address: "string" | "Unknown"; // Optional (default: "Unknown")
    city: "string" | "Unknown"; // Optional (default: "Unknown")
    zip: "string" | "Unknown"; // Optional (default: "Unknown")
    country: "string" | "Unknown"; // Optional (default: "Unknown")
    continent: "string" | "Unknown"; // Optional (default: "Unknown"),
    lat: number | 0; // Optional (default: 0)
    lng: number | 0; // Optional (default: 0)
}

export interface Amenities {
    wifi?: boolean | false; // Optional (default: false)
    parking?: boolean | false; // Optional (default: false)
    breakfast?: boolean | false; // Optional (default: false)
    pets?: boolean | false; // Optional (default: false)
}

export interface CreateProperty {
    name: string;
    description: string;
    media?: string[] | [];
    price: number;
    maxGuests: number;
    rating?: number;
    meta: {
        wifi?: boolean;
        parking?: boolean;
        breakfast?: boolean;
        pets?: boolean;
    };
    location: {
        address?: string;
        city?: string;
        zip?: string;
        country?: string;
        continent?: string;
        lat?: number;
        lng?: number;
    };
}
