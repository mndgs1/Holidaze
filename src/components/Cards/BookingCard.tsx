import React from "react";
import { Booking } from "../../constants/interfaces/booking";

import Heading from "../common/Heading";
import Text from "../common/Text";
// import Icon from "../common/Icon";

import { Link as RouterLink } from "react-router-dom";
import { formatToLongDate } from "../../utils/formatToLongDate";

interface CardProps {
    booking: Booking;
}

const BookingCard = ({ booking }: CardProps) => {
    return (
        <RouterLink
            to={`/holidaze/properties/${booking.venue.id}`}
            key={booking.id}
            className="group">
            <div className="border-b border-secondary-100 pb-4">
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
                        <Heading
                            h3
                            className="group-hover:underline transition">
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

                    {/* <div className="">
                    <RouterLink to={`holidaze/bookings/${booking.id}`}>
                        <button className="absolute bottom-0 right-0 flex gap-1 border border-gray-200 p-2 rounded-full drop-shadow transition hover:bg-gray-100">
                            <Icon receipt md className="fill-secondary" />
                        </button>
                    </RouterLink>
                </div> */}
                </div>
            </div>
        </RouterLink>
    );
};

export default BookingCard;
