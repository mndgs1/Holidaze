import React from "react";
import { Booking } from "../../constants/interfaces/booking";

import Heading from "./Heading";
import Text from "./Text";
import Icon from "./Icon";
import { Link as RouterLink } from "react-router-dom";

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
            <div
                key={booking.id}
                className="border-b border-secondary-100 pb-4 mt-4">
                <div className="flex gap-2 relative">
                    <div className="flex items-center">
                        <div className="h-28 w-28">
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
                    </div>
                    <div className="flex flex-col">
                        <Heading h3 className="mb-1">
                            {booking.venue.name}
                        </Heading>
                        <Text primary sm>
                            {booking.venue.rating} stars
                        </Text>
                        <Text primary sm>
                            For {booking.venue.maxGuests} Guests
                        </Text>
                        <Text primary>
                            <strong>{booking.venue.price}kr</strong> night
                        </Text>
                        <Text secondary>
                            {formatToLongDate(booking.dateFrom)} -
                            {formatToLongDate(booking.dateTo)}
                        </Text>
                    </div>
                    <div className="">
                        <RouterLink to={`/myProperties/${booking.id}`}>
                            <button className="absolute top-0 right-0 flex gap-1 border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100">
                                <Icon receipt md className="fill-secondary" />
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        );
    }
    if (property) {
        return (
            <div className="border-b border-secondary-100 pb-4">
                <div key={property.id} className="flex gap-2 relative ">
                    <div className="h-28 w-28">
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
                            <Heading h3>{property.name}</Heading>
                            <Text primary sm>
                                {property.location.address},{" "}
                                {property.location.city}{" "}
                            </Text>
                        </div>
                        <div>
                            <Text primary sm>
                                {property.rating} stars
                            </Text>
                            <Text primary sm>
                                For {property.maxGuests} Guests
                            </Text>
                            <Text primary>
                                <strong>{property.price}kr</strong> night
                            </Text>
                        </div>
                    </div>
                    <RouterLink to={`/myProperties/${property.id}`}>
                        <button className="absolute top-0 right-0 flex gap-1 border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100">
                            <Icon receipt md className="fill-secondary" />
                        </button>
                    </RouterLink>
                    <RouterLink to={`/myProperties/${property.id}`}>
                        <button className="absolute bottom-0 right-0 flex gap-1 border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100">
                            <Icon edit md className="fill-secondary" />
                        </button>
                    </RouterLink>
                </div>
            </div>
        );
    }
    return null;
};

export default Card;
