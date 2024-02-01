import React from "react";

import Heading from "../components/common/Heading";
import Hero from "../components/common/Hero";

import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { getProfileProperties } from "../api/properties/getProperties";
import { useUser } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/common/Card";
import { Property } from "../constants/interfaces/property";
import Button from "../components/common/Button";
import { Link as RouterLink } from "react-router-dom";

const MyProperties = () => {
    const token = useToken();
    const navigate = useNavigate();
    const user = useUser();
    if (!token || !user) {
        navigate("/login");
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ["myProperties"],
        queryFn: () => {
            if (!token || !user) {
                navigate("/login");
                throw new Error("No token or user");
            }
            return Promise.resolve(getProfileProperties(token, user.name));
        },
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error</span>;
    }

    console.log(data);
    // if there are no properties
    if (data?.length === 0) {
        return (
            <section>
                <Heading h1>My Properties</Heading>
                <Hero
                    informational
                    statement="You have no active properties"
                    suggestion="Create a property listing and start earning today!"
                    buttonText="List Property"
                    navigateTo="/holidaze/myProperties/create"
                />
            </section>
        );
    }

    return (
        <>
            <section className="border-b border-secondary-100 pb-4">
                {data?.map((property: Property) => (
                    <Card key={property.id} property={property} />
                ))}
            </section>
            <div className="flex justify-center mt-8">
                <RouterLink to="/holidaze/myProperties/create">
                    <Button primary xl>
                        List Property
                    </Button>
                </RouterLink>
            </div>
        </>
    );
};

export default MyProperties;
