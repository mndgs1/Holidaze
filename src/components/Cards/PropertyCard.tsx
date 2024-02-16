import React from "react";

import Heading from "../common/Heading";
import Text from "../common/Text";
import Icon from "../common/Icon";
import { Link as RouterLink } from "react-router-dom";

import { Property } from "../../constants/interfaces/property";

interface CardProps {
    property: Property;
}

const PropertyCard = ({ property }: CardProps) => {
    return (
        <div
            className="border-b border-secondary-100 pb-4 w-full"
            key={property.id}>
            <div className="flex flex-col sm:flex-row gap-2 relative ">
                <RouterLink to={`/holidaze/properties/${property.id}`}>
                    <div className="w-full h-72 sm:w-48 sm:h-32">
                        <img
                            src={
                                property.media[0]
                                    ? property.media[0]
                                    : "/assets/placeholders/property-placeholder.jpg"
                            }
                            alt={`${property.name}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </RouterLink>

                <div className="flex flex-col justify-between">
                    <div>
                        <RouterLink to={`/holidaze/properties/${property.id}`}>
                            <Heading h3 className="hover:underline transition">
                                {property.name}
                            </Heading>
                        </RouterLink>
                        <Text primary sm>
                            {property.location.address},{" "}
                            {property.location.city}{" "}
                        </Text>
                    </div>
                    <div>
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
                </div>

                <div className="absolute bottom-0 right-0 flex gap-4">
                    <RouterLink to={`/holidaze/myProperties/${property.id}`}>
                        <button className="border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100 transition">
                            <Icon receipt md className="fill-secondary" />
                        </button>
                    </RouterLink>
                    <RouterLink
                        to={`/holidaze/myProperties/edit/${property.id}`}>
                        <button className="border border-gray-200 p-2 rounded-full drop-shadow hover:bg-gray-100 transition">
                            <Icon edit md className="fill-secondary" />
                        </button>
                    </RouterLink>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
