import React from "react";
import { Booking } from "../../constants/interfaces/booking";

import Heading from "./Heading";
import Text from "./Text";
import Icon from "./Icon";
import { Link as RouterLink } from "react-router-dom";
import { formatToLongDate } from "../../utils/formatToLongDate";

import { Property } from "../../constants/interfaces/property";

interface CardProps {
    booking?: Booking;
    property?: Property;
    bookings?: Booking;
}

const Card = ({ booking, property }: CardProps) => {
    if (booking) {
        return (
            <div
                key={booking.id}
                className="border-b border-secondary-100 pb-4">
                <div className="flex flex-col sm:flex-row gap-2 relative">
                    <div className="flex items-center">
                        <div className="w-full h-72 sm:w-48 sm:h-32">
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
                        <RouterLink
                            to={`/holidaze/properties/${booking.venue.id}`}>
                            <Heading h3 className="hover:underline">
                                {booking.venue.name}
                            </Heading>
                        </RouterLink>
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
                        <RouterLink to={`holidaze/bookings/${booking.id}`}>
                            <button className="absolute bottom-0 right-0 flex gap-1 border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100">
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
            <div
                className="border-b border-secondary-100 pb-4 w-full"
                key={property.id}>
                <div className="flex flex-col sm:flex-row gap-2 relative ">
                    <RouterLink to={`/holidaze/properties/${property.id}`}>
                        <div className="w-full h-72 sm:w-48 sm:h-32">
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
                    </RouterLink>

                    <div className="flex flex-col justify-between">
                        <div>
                            <RouterLink
                                to={`/holidaze/properties/${property.id}`}>
                                <Heading h3 className="hover:underline">
                                    {property.name}
                                </Heading>
                            </RouterLink>
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

                    <div className="absolute bottom-0 right-0 flex gap-4">
                        <RouterLink
                            to={`/holidaze/myProperties/${property.id}`}>
                            <button className="border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100">
                                <Icon receipt md className="fill-secondary" />
                            </button>
                        </RouterLink>
                        <RouterLink
                            to={`/holidaze/myProperties/edit/${property.id}`}>
                            <button className="border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100">
                                <Icon edit md className="fill-secondary" />
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default Card;
