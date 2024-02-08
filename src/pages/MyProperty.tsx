import React from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../api/properties/getProperty";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";

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

    return (
        <>
            <Heading h1>My Property</Heading>
            <Heading h2>{data.name}</Heading>
            <Heading h3>Bookings</Heading>
            {/* {data.bookings.map((booking) => {
                return <Card booking={booking} />;
            })} */}
        </>
    );
};

export default MyProperty;
