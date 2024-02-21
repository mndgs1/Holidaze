import React from "react";

import Heading from "../components/common/Heading";
import Hero from "../components/common/Hero";

import { useNavigate } from "react-router-dom";
import { getProfileProperties } from "../api/properties/getProperties";
import { useUser } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { Property } from "../constants/interfaces/property";
import Button from "../components/common/Button";
import { Link as RouterLink } from "react-router-dom";
import Text from "../components/common/Text";
import PropertyCard from "../components/Cards/PropertyCard";

const MyProperties = () => {
    const navigate = useNavigate();
    const { user, token } = useUser();

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

    if (isError || !data) {
        const handleRefresh = () => {
            window.location.reload();
        };
        return (
            <Text danger>
                There was an error trying to get your Properties! Try
                refreshing...
                <Button secondary md onClick={handleRefresh}>
                    Refresh
                </Button>
            </Text>
        );
    }

    if (!user?.venueManager) {
        return (
            <section>
                <Heading h1>My Properties</Heading>
                <Hero
                    informational
                    statement="Only venue managers can list properties!"
                    suggestion="If you are a venue manager, please change your profile status."
                    buttonText="Profile"
                    navigateTo="/holidaze/profile"
                />
            </section>
        );
    }

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
            <Heading h1>My Properties</Heading>
            <section className="mt-4">
                {data?.map((property: Property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </section>
            <div className="flex justify-center mt-8">
                <RouterLink to="/holidaze/myProperties/create">
                    <Button primary xl>
                        List New Property
                    </Button>
                </RouterLink>
            </div>
        </>
    );
};

export default MyProperties;
