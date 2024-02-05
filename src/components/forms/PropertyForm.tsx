import React from "react";

import Button from "../common/Button";
import Text from "../common/Text";
import InputWithValidation from "../common/InputWithValidation";
import Heading from "../common/Heading";
import Textarea from "../common/Textarea";
import Input from "../common/Input";
import Carousel from "../../components/common/Carousel";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { postPropertySchema } from "../../constants/schemas";
import { useToken } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { postProperty } from "../../api/properties/postProperty";
import { CreateProperty } from "../../constants/interfaces/property";
import isImageValid from "../../utils/isImageValid";

const PropertyForm = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [serverError, setServerError] = React.useState("");
    const [media, setMedia] = React.useState<string[]>([]);
    const [mediaError, setMediaError] = React.useState("");

    const token = useToken();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(postPropertySchema),
    });

    const postPropertyMutation = useMutation({
        mutationFn: (data: CreateProperty) => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }

            console.log("data", data);
            const {
                name,
                description,
                media,
                price,
                maxGuests,
                rating,
                meta,
                location,
            } = data;
            return postProperty(token, {
                name,
                description,
                media,
                price,
                maxGuests,
                rating,
                meta,
                location,
            });
        },
        onSuccess: (data: CreateProperty) => {
            console.log("succesfuly registered", data);
            reset();
        },
        onError: (error: any) => {
            console.log(error);
            setServerError(error.message);
        },
        onSettled: () => setIsLoading(false),
    });

    function onSubmit(data: CreateProperty) {
        setValue("media", media);
        console.log("data onSubmit", data);
        postPropertyMutation.mutate(data);
    }

    async function handleAddMedia() {
        const mediaInput = document.getElementById("media") as HTMLInputElement;

        const isValid = await isImageValid(mediaInput.value);

        if (isValid) {
            setMediaError("");
            setValue("media", [...media, mediaInput.value]);
            setMedia([...media, mediaInput.value]);
            mediaInput.value = "";
        } else {
            setMediaError("URL provided does not lead to an Image");
        }
    }

    return (
        <>
            <form
                className="flex flex-col gap-5 my-3"
                onSubmit={handleSubmit(onSubmit)}>
                <InputWithValidation
                    input={{
                        name: "name",
                        label: "Property Name",
                        type: "text",
                        id: "name",
                    }}
                    register={register}
                    errors={errors}
                />
                <div className="relative">
                    <Carousel images={getValues("media")} carouselControls />
                </div>

                <div>
                    <div className="flex">
                        <Input
                            type="text"
                            id="media"
                            label="Media Url"
                            danger={!!mediaError}
                        />
                        <Button
                            onClick={handleAddMedia}
                            primary
                            sm
                            type="button"
                            className="h-13 -ml-1.5">
                            Add
                        </Button>
                    </div>

                    <div>
                        {mediaError && (
                            <Text sm danger>
                                {mediaError}
                            </Text>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Textarea
                        id="description"
                        label="Description"
                        {...register("description")}
                        danger={!!errors["description"]?.message}
                    />
                    {errors["description"]?.message && (
                        <Text danger sm>
                            {errors["description"]?.message}
                        </Text>
                    )}
                </div>
                <div className="flex gap-3">
                    <InputWithValidation
                        input={{
                            name: "price",
                            label: "Price",
                            type: "number",
                            id: "price",
                        }}
                        register={register}
                        errors={errors}
                    />
                    <InputWithValidation
                        input={{
                            name: "maxGuests",
                            label: "Max Guests",
                            type: "number",
                            id: "maxGuests",
                        }}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        type="number"
                        id="rating"
                        label="Rating"
                        {...register("rating")}
                    />
                </div>
                <Heading h2>Location</Heading>
                <Input
                    type="text"
                    id="address"
                    label="Address"
                    {...register("location.address")}
                />
                <div className="flex w-full gap-3">
                    <Input
                        type="text"
                        id="city"
                        label="City"
                        {...register("location.city")}
                    />
                    <Input
                        type="text"
                        id="zip"
                        label="Zip code"
                        {...register("location.zip")}
                    />
                </div>
                <div className="flex gap-3 w-full">
                    <Input
                        type="text"
                        id="country"
                        label="Country"
                        {...register("location.country")}
                    />
                    <Input
                        type="text"
                        id="continent"
                        label="Continent"
                        {...register("location.continent")}
                    />
                </div>
                <Heading h2>Amenities</Heading>
                <Input
                    type="checkbox"
                    id="wifi"
                    label="Wifi"
                    {...register("meta.wifi")}
                />
                <Input
                    type="checkbox"
                    id="parking"
                    label="Parking"
                    {...register("meta.parking")}
                />
                <Input
                    type="checkbox"
                    id="breakfast"
                    label="Breakfast"
                    {...register("meta.breakfast")}
                />
                <Input
                    type="checkbox"
                    id="pets"
                    label="Pets"
                    {...register("meta.pets")}
                />
                <div className="flex flex-col items-center">
                    <Button primary xl loading={isLoading}>
                        List Property
                    </Button>
                    {serverError && (
                        <div className="p-2 bg-danger-50 rounded mt-8">
                            <Text danger>{serverError}</Text>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};
export default PropertyForm;
