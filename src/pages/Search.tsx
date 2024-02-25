import React from "react";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import { useToken } from "../stores/useUserStore";
import { getProperties } from "../api/properties/getProperties";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PropertiesCardSkeleton from "../components/common/Skeletons/PropertiesCardSkeleton";
import { useParams } from "react-router-dom";

const Search = () => {
    const token = useToken();
    const navigate = useNavigate();

    const { search } = useParams<{ search: string }>();

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

    if (isError) {
        const handleRefresh = () => {
            window.location.reload();
        };

        return (
            <Text danger>
                There was an error trying to get properties! Try refreshing...
                <Button secondary md onClick={handleRefresh}>
                    Refresh
                </Button>
            </Text>
        );
    }

    if (isLoading) {
        return (
            <section className="md:grid md:gap-8 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 animate-pulse">
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
                <PropertiesCardSkeleton />
            </section>
        );
    }

    const filteredProperties = data?.filter((property) => {
        if (!search) return property;
        return property.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <article>
            <section>
                <Heading h1>Search for: {search}</Heading>
                <Text primary className="mb-4">
                    We found {filteredProperties?.length} properties that match
                    your search.
                </Text>
            </section>
            <section className="md:grid md:gap-8 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
                {filteredProperties?.map((property) => (
                    <Link
                        to={`/holidaze/properties/${property.id}`}
                        key={property.id}
                        className="block">
                        <div className="pb-1 mb-4 border-b border-secondary-100">
                            <div className="h-72 mb-1">
                                <img
                                    src={
                                        property.media[0]
                                            ? property.media[0]
                                            : "/assets/placeholders/property-placeholder.jpg"
                                    }
                                    className="w-full object-cover h-full rounded-lg"
                                    alt={`${property.name}`}
                                />
                            </div>
                            <Heading h3 className="mb-0 hover:underline">
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
        </article>
    );
};

export default Search;
