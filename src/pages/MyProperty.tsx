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
import { formatToLongDate } from "../utils/formatToLongDate";
import { subtractDates } from "../utils/subtractDates";

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

    const futureBookings = data.bookings.filter((booking) =>
        isFutureDate(booking.dateFrom)
    );

    const pastBookings = data.bookings.filter(
        (booking) => !isFutureDate(booking.dateFrom)
    );

    console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Heading h1>{data.name}</Heading>
            {pastBookings.length > 0 && (
                <section>
                    <Heading h2 className="mb-1">
                        Upcomming bookings
                    </Heading>
                    <table className="w-full border-collapse">
                        <thead className="">
                            <tr className="">
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        From
                                    </Text>
                                </th>
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        To
                                    </Text>
                                </th>
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        Guests
                                    </Text>
                                </th>
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        Total Days
                                    </Text>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {futureBookings.map((fBooking) => {
                                return (
                                    <tr key={fBooking.id}>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {formatToLongDate(
                                                    fBooking.dateFrom
                                                )}
                                            </Text>
                                        </td>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {formatToLongDate(
                                                    fBooking.dateTo
                                                )}
                                            </Text>
                                        </td>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {fBooking.guests}
                                            </Text>
                                        </td>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {subtractDates(
                                                    fBooking.dateFrom,
                                                    fBooking.dateTo
                                                )}
                                            </Text>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            )}
            {pastBookings.length > 0 && (
                <section>
                    <Heading h2>History</Heading>
                    <table className="w-full border-collapse">
                        <thead className="">
                            <tr className="">
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        From
                                    </Text>
                                </th>
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        To
                                    </Text>
                                </th>
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        Guests
                                    </Text>
                                </th>
                                <th className=" border border-slate-500">
                                    <Text primary bold>
                                        Total Days
                                    </Text>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastBookings.map((fBooking) => {
                                return (
                                    <tr key={fBooking.id}>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {formatToLongDate(
                                                    fBooking.dateFrom
                                                )}
                                            </Text>
                                        </td>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {formatToLongDate(
                                                    fBooking.dateTo
                                                )}
                                            </Text>
                                        </td>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {fBooking.guests}
                                            </Text>
                                        </td>
                                        <td className=" border border-slate-500">
                                            <Text primary>
                                                {subtractDates(
                                                    fBooking.dateFrom,
                                                    fBooking.dateTo
                                                )}
                                            </Text>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    );
};

export default MyProperty;
