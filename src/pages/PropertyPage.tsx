import React, { useState } from "react";
import { getProperty } from "../api/properties/getProperty";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";

import { MdOutlineWifi } from "react-icons/md";
import { LuParkingSquare } from "react-icons/lu";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

import DatePicker from "../components/common/DatePicker/DatePicker";
import { DayRange } from "react-modern-calendar-datepicker";

import { createBookedDaysArray } from "../utils/createBookedDaysArray";
import { monthNumberToName } from "../utils/monthNumberToName";

import { useMutation } from "@tanstack/react-query";
import { Booking, CreateBookingData } from "../constants/interfaces/booking";
import { postBooking } from "../api/bookings/postBooking";
import { postBookingSchema } from "../constants/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const PropertyPage = () => {
    const token = useToken();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    if (id === undefined) {
        throw new Error("Cant find a property id");
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(postBookingSchema),
    });

    const { isLoading, isError, data } = useQuery({
        queryKey: [`property/${id}`],
        queryFn: () => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }
            return Promise.resolve(getProperty(token, id));
        },
    });

    const bookingMutation = useMutation({
        mutationFn: (data: CreateBookingData) => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }
            return postBooking(token, data);
        },
        onSuccess: (data: Booking) => {
            console.log("succesfuly logged in", data);
        },
        onError: (error: any) => {
            console.log(error.message);
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

    function onSubmit(data: any) {
        // Why does it send in repeat password? it does not check for types
        console.log("data onSubmit", data);
        bookingMutation.mutate(data);
    }
    console.log(selectedDayRange);
    const bookedDays = createBookedDaysArray(data);
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

            <section className="pb-3.5 mb-3.5 border-b border-secondary-100 ">
                <div className="pb-3.5 mb-3.5 border-b border-secondary-100">
                    <Heading h3 className="mb-2.5">
                        Book Property
                    </Heading>
                    <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                        disabledDays={bookedDays}
                    />
                    <div className="flex gap-2 items-center">
                        <Text primary bold className="">
                            Guests:
                        </Text>
                        <button>
                            <CiCircleMinus className="h-8 w-8 fill-secondary-300 hover:fill-secondary" />
                        </button>
                        <Text primary bold>
                            5
                        </Text>
                        <button>
                            <CiCirclePlus className="h-8 w-8 fill-secondary-300 hover:fill-secondary" />
                        </button>
                    </div>
                </div>
                <div className=" flex justify-between">
                    <div>
                        <Text bold className="underline ">
                            {selectedDayRange.from && selectedDayRange.to
                                ? `${monthNumberToName(
                                      selectedDayRange.from.month
                                  ).substring(0, 3)} ${
                                      selectedDayRange.from.day
                                  } -  ${monthNumberToName(
                                      selectedDayRange.to.month
                                  ).substring(0, 3)} ${selectedDayRange.to.day}`
                                : "Choose Time"}
                        </Text>
                        <Text>
                            <strong>{data.price}</strong> kr night
                        </Text>
                    </div>
                    <Button primary md>
                        Reserve
                    </Button>
                </div>
            </section>
        </>
    );
};

export default PropertyPage;
