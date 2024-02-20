import React, { useEffect } from "react";

import Button from "../common/Button";
import Text from "../common/Text";
import InputWithValidation from "../common/InputWithValidation";
import Heading from "../common/Heading";
import Textarea from "../common/Textarea";
import Input from "../common/Input";
import Carousel from "../../components/common/Carousel";
import ServerMessage from "../common/ServerMessage";
import isImageValid from "../../utils/isImageValid";
import { Link } from "react-router-dom";
import Modal from "../common/Modal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { postPropertySchema } from "../../constants/schemas";
import { useToken } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { CreateProperty } from "../../constants/interfaces/property";
import { Property } from "../../constants/interfaces/property";
import { putProperty } from "../../api/properties/putProperty";
import useIsMobile from "../../hooks/useIsMobile";
import Gallery from "../common/Gallery";
import Icon from "../common/Icon";

interface PropertyFormProps {
    property: Property;
}

const EditMyPropertyForm = ({ property }: PropertyFormProps) => {
    const [mediaError, setMediaError] = React.useState("");
    const [media, setMedia] = React.useState<string[]>(property.media);

    const isMobile = useIsMobile();

    const token = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        setMedia(property.media);
    }, [property]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(postPropertySchema),
    });

    const { mutate, error, isError, isPending, isSuccess } = useMutation({
        mutationFn: (data: CreateProperty) => {
            if (!token) {
                navigate("/login");
                throw new Error("No token");
            }

            return putProperty(property.id, token, data);
        },
    });

    function onSubmit(data: CreateProperty) {
        data.media = media;
        mutate(data);
    }

    // adds media to array from input, validates if url leads to an image
    async function handleAddMedia() {
        const mediaInput = document.getElementById("media") as HTMLInputElement;

        const isValid = await isImageValid(mediaInput.value);

        if (isValid) {
            setMediaError("");
            setMedia([...media, mediaInput.value]);

            mediaInput.value = "";
        } else {
            setMediaError("URL provided does not lead to an Image");
        }
    }

    const handleDeleteMedia = (index: number) => () => {
        const newMedia = media.filter((_, i) => i !== index);
        setMedia(newMedia);
    };
    return (
        <>
            <form
                className="flex flex-col gap-5 my-3"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <div>
                        {isMobile ? (
                            <Carousel images={media} carouselControls />
                        ) : (
                            <Gallery images={media} />
                        )}
                    </div>
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
                <div className="w-full flex flex-wrap gap-1">
                    {media.map((image, index) => (
                        <div
                            key={index}
                            className="flex gap-1 items-center bg-gray-100 p-2 rounded-xl">
                            <Text>{index + 1}. Image</Text>
                            <Button
                                danger
                                sm
                                type="button"
                                onClick={handleDeleteMedia(index)}>
                                <Icon deleteIcon sm />
                            </Button>
                        </div>
                    ))}
                </div>
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
                    <Button primary xl loading={isPending}>
                        Save Changes
                    </Button>
                    {isError && isError && (
                        <ServerMessage danger>{error.message}</ServerMessage>
                    )}
                </div>
                {isSuccess && (
                    <Modal isOpen>
                        <div className="flex flex-col gap-4 p-12 sm:p-24">
                            <Heading h2>Property edited succesfuly!</Heading>
                            <Link to={"/holidaze/myProperties"}>
                                <Button primary xl>
                                    My Rentals
                                </Button>
                            </Link>
                        </div>
                    </Modal>
                )}
            </form>
        </>
    );
};
export default EditMyPropertyForm;
