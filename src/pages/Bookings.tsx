import React from "react";
import { getBookings } from "../api/bookings/getBookings";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../stores/useUserStore";
import { isFutureDate } from "../utils/isFutureDate";

import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Hero from "../components/common/Hero";
import BookingCard from "../components/Cards/BookingCard";

const Bookings = () => {
    const navigate = useNavigate();
    const { user, token } = useUser();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => {
            if (!token || !user) {
                navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getBookings(token, user.name));
        },
    });

    if (isLoading) {
        // Create skeletons
        return <span>Loading...</span>;
    }

    const handleRefresh = () => {
        window.location.reload();
    };

    if (isError || !data) {
        return (
            <Text danger>
                There was an error trying to get your bookings! Try
                refreshing...
                <Button secondary md onClick={handleRefresh}>
                    Refresh
                </Button>
            </Text>
        );
    }

    const futureBookings = data.filter((booking) =>
        isFutureDate(booking.dateTo)
    );

    const pastBookings = data.filter(
        (booking) => !isFutureDate(booking.dateTo)
    );

    return (
        <>
            <section className="">
                {futureBookings.length > 0 ? (
                    <div>
                        <Heading h1>Upcomming</Heading>
                        <div className="flex flex-col gap-4">
                            {futureBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Hero
                        informational
                        statement="You have no upcomming trips"
                        suggestion="Start looking for a new adventure!"
                        buttonText="Explore"
                        navigateTo="/holidaze/properties"></Hero>
                )}
            </section>
            <section className="mt-8">
                {pastBookings.length > 0 && (
                    <div>
                        <Heading h1>History</Heading>

                        <div className="flex flex-col gap-4">
                            {pastBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Bookings;
