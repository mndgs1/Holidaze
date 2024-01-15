import React from "react";
import Text from "../components/common/Text";
import { useToken } from "../stores/useUserStore";
import { getProperties } from "../api/properties/getProperties";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Properties = () => {
    const token = useToken();
    const navigate = useNavigate();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["properties"],
        queryFn: () => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getProperties(token));
        },
        staleTime: 5 * 100000,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return (
            <Text danger>
                There was an error trying to get properties! Try refreshing...
            </Text>
        );
    }

    return (
        <>
            <section>
                <Text primary>Properties</Text>
            </section>
        </>
    );
};

export default Properties;
