import React from "react";
import { Booking } from "../../constants/interfaces/booking";

import Heading from "./Heading";
import Text from "./Text";

import { format } from "date-fns";
import { Property } from "../../constants/interfaces/property";

function formatToLongDate(dateString: string): string {
    const inputDate = new Date(dateString);
    const formattedDate = format(inputDate, "dd MMMM yyyy");
    return formattedDate;
}

interface CardProps {
    booking?: Booking;
    property?: Property;
}

const Card = ({ booking, property }: CardProps) => {
    if (booking) {
        return (
            <div key={booking.id} className="flex gap-2">
                <div className="h-24 w-24">
                    <img
                        src={
                            booking.venue.media[0]
                                ? booking.venue.media[0]
                                : "/assets/placeholders/property-placeholder.jpg"
                        }
                        alt={`${booking.venue.name}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <Heading h4>{booking.venue.name}</Heading>
                        <Text primary>Rating: {booking.venue.rating}</Text>
                    </div>
                    <Text secondary>
                        {formatToLongDate(booking.dateFrom)} -{" "}
                        {formatToLongDate(booking.dateTo)}
                    </Text>
                </div>
            </div>
        );
    }
    if (property) {
        return (
            <div key={property.id} className="flex gap-2">
                <div className="h-32 w-32">
                    <img
                        src={
                            property.media[0]
                                ? property.media[0]
                                : "/assets/placeholders/property-placeholder.jpg"
                        }
                        alt={`${property.name}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <Heading h4>{property.name}</Heading>
                        <Text primary>Price: {property.price} kr</Text>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default Card;
