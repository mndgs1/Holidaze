import React from "react";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import { useToken } from "../stores/useUserStore";
import { getProperties } from "../api/properties/getProperties";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
                <Button secondary>Refresh</Button>
            </Text>
        );
    }

    return (
        <>
            <section className="">
                {data?.map((property) => (
                    <Link
                        to={`/app/properties/${property.id}`}
                        key={property.id}
                        className="block">
                        <div className="pb-1 mb-4 border-b border-secondary-100">
                            <div className="w-full h-84">
                                <img
                                    className="w-full h-full object-cover rounded-lg"
                                    src={
                                        Array.isArray(property.media) &&
                                        property.media.length > 0
                                            ? property.media[0]
                                            : "/assets/placeholders/Property-placeholder.jpg"
                                    }
                                    alt={property.name}
                                />
                            </div>
                            <Heading h3 className="mb-0">
                                {property.name}
                            </Heading>
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
                    </Link>
                ))}
            </section>
        </>
    );
};

export default Properties;
