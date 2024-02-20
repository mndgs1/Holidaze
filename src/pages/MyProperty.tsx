import React from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../api/properties/getProperty";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import { isFutureDate } from "../utils/isFutureDate";
import { subtractDates } from "../utils/subtractDates";
import { Booking } from "../constants/interfaces/booking";
import { dateToLocaleDateString } from "../utils/dateToLocaleDateString";
import Table from "../components/common/Table";
import Hero from "../components/common/Hero";

interface BookingTableData extends Booking {
    Total: number;
}

const MyProperty = () => {
    const { id } = useParams();
    const token = useToken();
    const navigate = useNavigate();

    if (id === undefined) {
        throw new Error("Cant find a property id");
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: [`myProperty/${id}`],
        queryFn: () => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getProperty(token, id));
        },
    });
    if (isError || !data) {
        const handleRefresh = () => {
            window.location.reload();
        };

        return (
            <Text danger>
                There was an error trying to get your Property! Try
                refreshing...
                <Button secondary md onClick={handleRefresh}>
                    Refresh
                </Button>
            </Text>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const futureBookings = data.bookings.filter((booking) =>
        isFutureDate(booking.dateTo)
    );

    const pastBookings = data.bookings.filter(
        (booking) => !isFutureDate(booking.dateTo)
    );

    // Table config
    const tableCfg = [
        {
            label: "Guests",
            render: (data: BookingTableData) => data.guests.toString(),
        },
        {
            label: "From",
            render: (data: BookingTableData) =>
                dateToLocaleDateString(data.dateFrom),
        },
        {
            label: "To",
            render: (data: BookingTableData) =>
                dateToLocaleDateString(data.dateTo),
        },
        {
            label: "Days",
            render: (data: BookingTableData) =>
                subtractDates(data.dateFrom, data.dateTo).toString(),
        },
    ];
    const keyFn = (bookingData: Booking) => {
        return bookingData.created;
    };

    return (
        <>
            <Heading h1>{data.name}</Heading>
            <section className="mb-4">
                <Heading h2>Bookings</Heading>
                {futureBookings.length > 0 ? (
                    <Table
                        data={futureBookings}
                        config={tableCfg}
                        keyFn={keyFn}
                        className="w-full max-w-lg"
                    />
                ) : (
                    <Hero
                        statement={
                            "You have no upcomming bookings on your property."
                        }
                        suggestion={
                            "Try editing your property listing to get better traction!"
                        }
                        buttonText={"Edit property"}
                        navigateTo={`/holidaze/myProperties/edit/${id}`}
                        informational
                    />
                )}
            </section>
            <section>
                <Heading h2>History</Heading>
                {pastBookings.length > 0 ? (
                    <Table
                        data={pastBookings}
                        config={tableCfg}
                        keyFn={keyFn}
                        className="w-full max-w-lg"
                    />
                ) : (
                    <Text secondary>
                        Booking history of the property has no entries
                    </Text>
                )}
            </section>
        </>
    );
};

export default MyProperty;
