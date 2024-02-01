import React from "react";
import { useToken } from "../stores/useUserStore";
import { getBookings } from "../api/bookings/getBookings";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../stores/useUserStore";
import { isFutureDate } from "../utils/isFutureDate";

import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Card from "../components/common/Card";
import Hero from "../components/common/Hero";

const Bookings = () => {
    const token = useToken();
    const navigate = useNavigate();
    const user = useUser();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["bookings"],
        queryFn: () => {
            if (!token || !user) {
                navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getBookings(token, user.name));
        },
        // staleTime: 5 * 100000,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError || !data) {
        return (
            <Text danger>
                There was an error trying to get properties! Try refreshing...
                <Button secondary>Refresh</Button>
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
            <section>
                <Heading h1>Upcomming</Heading>
                {futureBookings.length > 0 ? (
                    <div className="mt-4 flex flex-col gap-4">
                        {futureBookings.map((booking) => (
                            <Card key={booking.id} booking={booking} />
                        ))}
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
                <Heading h1>History</Heading>
                <div className="mt-4 flex flex-col gap-4">
                    {pastBookings.length > 0 &&
                        pastBookings.map((booking) => (
                            <Card key={booking.id} booking={booking} />
                        ))}
                </div>
            </section>
        </>
    );
};

export default Bookings;
