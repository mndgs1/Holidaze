import React, { useState } from "react";
import { getProperty } from "../api/properties/getProperty";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../stores/useUserStore";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";

import { MdOutlineWifi } from "react-icons/md";
import { LuParkingSquare } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Property = () => {
    const token = useToken();
    const { id } = useParams<{ id: string }>();

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null,
    });

    if (id === undefined) {
        throw new Error("Cant find a property id");
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: [`property/${id}`],
        queryFn: () => {
            if (!token) {
                // navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getProperty(token, id));
        },
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

    console.log(data);

    return (
        <>
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                <div className="w-full h-84 mb-3.5">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={
                            Array.isArray(data.media) && data.media.length > 0
                                ? data.media[0]
                                : "/assets/placeholders/Property-placeholder.jpg"
                        }
                        alt={data.name}
                    />
                </div>
                <Heading className="" h2>
                    {data.name}
                </Heading>
                <Text primary>{data.rating} stars</Text>
                <Text primary>For {data.maxGuests} Guests</Text>
                <Text primary>
                    <strong>{data.price}kr</strong> night
                </Text>
            </section>
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                <Heading h3 className="mb-2.5">
                    Description
                </Heading>
                <Text>{data.description}</Text>
            </section>
            {data.location.address && (
                <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                    <Heading h3 className="mb-2.5">
                        Location
                    </Heading>
                    <Text>{data.location.address}</Text>
                    <Text>
                        {data.location.city ? data.location.city : ""},{" "}
                        {data.location.zip ? data.location.zip : ""}
                    </Text>
                    <Text>
                        {data.location.country ? data.location.country : ""}
                    </Text>
                </section>
            )}
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                <Heading h3 className="mb-2.5">
                    Amenities
                </Heading>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                        <MdOutlineWifi className="h-6 w-6 " />
                        <Text
                            primary
                            className={data.meta.wifi ? "" : "line-through"}>
                            Wifi
                        </Text>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LuParkingSquare className="h-6 w-6" />
                        <Text
                            primary
                            className={data.meta.wifi ? "" : "line-through"}>
                            Parking
                        </Text>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdOutlinePets className="h-6 w-6 " />
                        <Text
                            primary
                            className={data.meta.wifi ? "" : "line-through"}>
                            Pets
                        </Text>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdOutlineRestaurantMenu className="h-6 w-6 " />
                        <Text
                            primary
                            className={data.meta.wifi ? "" : "line-through"}>
                            Breakfast
                        </Text>
                    </div>
                </div>
            </section>
            <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                <Heading h3 className="mb-2.5">
                    Availability
                </Heading>
                <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    shouldHighlightWeekends
                />
            </section>
            {data.owner && (
                <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                    <Heading h3 className="mb-2.5">
                        Owner
                    </Heading>
                    <div className="flex items-end gap-2">
                        <div className="h-16 w-16">
                            <img
                                src={
                                    data.owner.avatar
                                        ? data.owner.avatar
                                        : "/assets/placeholders/profile-placeholder.jpg"
                                }
                                className="rounded-full h-full w-full object-cover"
                                alt={`${data.owner.name} avatar`}
                            />
                        </div>
                        <div className="">
                            <Text primary>{data.owner.name}</Text>
                            <Text primary>{data.owner.email}</Text>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Property;
