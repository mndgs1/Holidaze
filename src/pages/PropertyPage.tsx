import React, { useState } from "react";
import { getProperty } from "../api/properties/getProperty";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

import Button from "../components/common/Button";
import Text from "../components/common/Text";
import Heading from "../components/common/Heading";
import Modal from "../components/common/Modal";
import Icon from "../components/common/Icon";
import DatePicker from "../components/common/DatePicker/DatePicker";
import Carousel from "../components/common/Carousel";

import PropertyPageSkeleton from "../components/common/Skeletons/PropertyPageSkeleton";

import { DayRange } from "react-modern-calendar-datepicker";
import { createBookedDaysArray } from "../utils/createBookedDaysArray";
import { monthNumberToName } from "../utils/monthNumberToName";

import { useMutation } from "@tanstack/react-query";
import { Booking, CreateBookingData } from "../constants/interfaces/booking";
import { postBooking } from "../api/bookings/postBooking";
import { postBookingSchema } from "../constants/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Gallery from "../components/common/Gallery";

const PropertyPage = () => {
    const token = useToken();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const [guestCount, setGuestCount] = useState<number>(1);
    const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
        from: null,
        to: null,
    });

    if (id === undefined) {
        throw new Error("Cant find a property id");
    }

    const { setValue, watch } = useForm({
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

    const { dateFrom, dateTo } = watch();

    React.useEffect(() => {
        setValue("guests", guestCount);
        if (selectedDayRange.from) {
            const fromDate = new Date(
                selectedDayRange.from.year,
                selectedDayRange.from.month - 1,
                selectedDayRange.from.day
            );
            setValue("dateFrom", fromDate);
        }

        if (selectedDayRange.to) {
            const toDate = new Date(
                selectedDayRange.to.year,
                selectedDayRange.to.month - 1,
                selectedDayRange.to.day
            );
            setValue("dateTo", toDate);
        }
    }, [setValue, guestCount, selectedDayRange.from, selectedDayRange.to]);

    const bookingMutation = useMutation({
        mutationFn: (data: CreateBookingData) => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }
            console.log(data);
            return postBooking(token, data);
        },
        onSuccess: (data: Booking) => {
            console.log("mutation sucess", data);
        },
        onError: (error: any) => {
            console.log(error.message);
        },
    });

    if (isLoading) {
        return <PropertyPageSkeleton />;
    }

    if (isError || !data) {
        const handleError = () => window.location.reload();
        return (
            <Text danger>
                There was an error trying to get properties! Try refreshing...
                <Button secondary md onClick={handleError}>
                    Refresh
                </Button>
            </Text>
        );
    }

    function onSubmit() {
        if (data) {
            const bookingData: CreateBookingData = {
                venueId: data.id,
                guests: guestCount,
                dateFrom: dateFrom,
                dateTo: dateTo,
            };
            console.log("booking data", bookingData);
            bookingMutation.mutate(bookingData);
        }
    }
    const guestMinus = () => {
        const updatedValue = Math.max(guestCount - 1, 1);
        setGuestCount(updatedValue);
    };

    const guestPlus = () => {
        const updatedValue = Math.min(guestCount + 1, data.maxGuests);
        setGuestCount(updatedValue);
    };

    const bookedDays = createBookedDaysArray(data);
    return (
        <>
            {isMobile ? (
                <Carousel images={data.media} carouselControls />
            ) : (
                <Gallery images={data.media} />
            )}
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-4">
                <div className="col-span-2">
                    <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                        <Heading h2>{data.name}</Heading>
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
                                {data.location.country
                                    ? data.location.country
                                    : ""}
                            </Text>
                        </section>
                    )}
                    <section className="pb-3.5 mb-3.5 border-b border-secondary-100">
                        <Heading h3 className="mb-2.5">
                            Amenities
                        </Heading>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <Icon wifi md />
                                <Text
                                    primary
                                    className={
                                        data.meta.wifi ? "" : "line-through"
                                    }>
                                    Wifi
                                </Text>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Icon parking md />
                                <Text
                                    primary
                                    className={
                                        data.meta.parking ? "" : "line-through"
                                    }>
                                    Parking
                                </Text>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Icon pets md />
                                <Text
                                    primary
                                    className={
                                        data.meta.pets ? "" : "line-through"
                                    }>
                                    Pets
                                </Text>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Icon breakfast md />
                                <Text
                                    primary
                                    className={
                                        data.meta.breakfast
                                            ? ""
                                            : "line-through"
                                    }>
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
                                    <Text primary bold>
                                        {data.owner.name}
                                    </Text>
                                    <Text primary>{data.owner.email}</Text>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
                <div className="col-span-1">
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
                                <button type="button" onClick={guestMinus}>
                                    <Icon
                                        minus
                                        lg
                                        className=" fill-secondary-300 hover:fill-secondary"
                                    />
                                </button>
                                <Text primary bold>
                                    {guestCount}
                                </Text>
                                <button type="button" onClick={guestPlus}>
                                    <Icon
                                        plus
                                        lg
                                        className="fill-secondary-300 hover:fill-secondary"
                                    />
                                </button>
                                <Text secondary>
                                    Max. {data.maxGuests} Guests
                                </Text>
                            </div>
                        </div>
                        <div className=" flex justify-between">
                            <div>
                                <Text bold className="underline ">
                                    {selectedDayRange.from &&
                                    selectedDayRange.to
                                        ? `${monthNumberToName(
                                              selectedDayRange.from.month
                                          ).substring(0, 3)} ${
                                              selectedDayRange.from.day
                                          } -  ${monthNumberToName(
                                              selectedDayRange.to.month
                                          ).substring(0, 3)} ${
                                              selectedDayRange.to.day
                                          }`
                                        : "Choose Time"}
                                </Text>
                                <Text>
                                    <strong>{data.price}</strong> kr night
                                </Text>
                            </div>
                            <Button primary md onClick={onSubmit}>
                                Reserve
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
            {bookingMutation.isSuccess && (
                <Modal isOpen>
                    <div className="flex flex-col gap-4 p-24 items-center">
                        <Heading h2>Booking Successful!</Heading>
                        <Text primary>Prepare for your trip!</Text>
                        <Link to={"/holidaze/bookings"}>
                            <Button primary xl>
                                View Bookings
                            </Button>
                        </Link>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PropertyPage;
