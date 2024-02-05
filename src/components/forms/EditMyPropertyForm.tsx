import React, { useEffect } from "react";

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
import { CreateProperty } from "../../constants/interfaces/property";
import { Property } from "../../constants/interfaces/property";
import isImageValid from "../../utils/isImageValid";
import { putProperty } from "../../api/properties/putProperty";

interface PropertyFormProps {
    property: Property;
}

const EditMyPropertyForm = ({ property }: PropertyFormProps) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [serverError, setServerError] = React.useState("");
    const [mediaError, setMediaError] = React.useState("");
    const [media, setMedia] = React.useState<string[]>(property.media);

    useEffect(() => {
        setValue("media", property.media);
    });

    const token = useToken();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
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
            return putProperty(property.id, token, {
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
            console.log("succesfuly edited", data);
        },
        onError: (error: any) => {
            console.log(error);
            setServerError(error.message);
        },
        onSettled: () => setIsLoading(false),
    });

    function onSubmit(data: CreateProperty) {
        console.log("data onSubmit", data);
        postPropertyMutation.mutate(data);
    }

    async function handleAddMedia() {
        const mediaInput = document.getElementById("media") as HTMLInputElement;

        const isValid = await isImageValid(mediaInput.value);

        if (isValid) {
            setMediaError("");
            if (media) {
                setValue("media", [...media, mediaInput.value]);
                setMedia([...media, mediaInput.value]);
            } else {
                setValue("media", [mediaInput.value]);
                setMedia([...media, mediaInput.value]);
            }

            mediaInput.value = "";
            console.log("media:" + getValues("media"));
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
                    defaultValue={property.name}
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
                        defaultValue={property ? property.description : ""}
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
                        defaultValue={property ? property.price : ""}
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
                        defaultValue={property ? property.maxGuests : ""}
                        register={register}
                        errors={errors}
                    />
                    <Input
                        type="number"
                        id="rating"
                        label="Rating"
                        {...register("rating")}
                        defaultValue={property?.rating?.toString() ?? ""}
                    />
                </div>
                <Heading h2>Location</Heading>
                <Input
                    type="text"
                    id="address"
                    label="Address"
                    {...register("location.address")}
                    defaultValue={property ? property.location.address : ""}
                />
                <div className="flex w-full gap-3">
                    <Input
                        type="text"
                        id="city"
                        label="City"
                        {...register("location.city")}
                        defaultValue={property ? property.location.city : ""}
                    />
                    <Input
                        type="text"
                        id="zip"
                        label="Zip code"
                        {...register("location.zip")}
                        defaultValue={property ? property.location.zip : ""}
                    />
                </div>
                <div className="flex gap-3 w-full">
                    <Input
                        type="text"
                        id="country"
                        label="Country"
                        {...register("location.country")}
                        defaultValue={property ? property.location.country : ""}
                    />
                    <Input
                        type="text"
                        id="continent"
                        label="Continent"
                        {...register("location.continent")}
                        defaultValue={
                            property ? property.location.continent : ""
                        }
                    />
                </div>
                <Heading h2>Amenities</Heading>
                <Input
                    type="checkbox"
                    id="wifi"
                    label="Wifi"
                    {...register("meta.wifi")}
                    defaultChecked={property ? property.meta.wifi : false}
                />
                <Input
                    type="checkbox"
                    id="parking"
                    label="Parking"
                    {...register("meta.parking")}
                    defaultChecked={property ? property.meta.parking : false}
                />
                <Input
                    type="checkbox"
                    id="breakfast"
                    label="Breakfast"
                    {...register("meta.breakfast")}
                    defaultChecked={property ? property.meta.breakfast : false}
                />
                <Input
                    type="checkbox"
                    id="pets"
                    label="Pets"
                    {...register("meta.pets")}
                    defaultChecked={property ? property.meta.pets : false}
                />
                <div className="flex justify-center">
                    <Button primary xl loading={isLoading}>
                        Save Changes
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
export default EditMyPropertyForm;
