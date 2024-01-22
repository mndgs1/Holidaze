import React, { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";
import { MdEdit } from "react-icons/md";
import InputWithValidation from "./InputWithValidation";
import { CombinedInputConfig } from "../../constants/inputConfig";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useImageValidator from "../../hooks/useImageValidator";

import { useForm } from "react-hook-form";

type FormValues = { avatar: string };

const Avatar = ({
    avatar,
    setModalFormData,
}: {
    avatar: string | undefined;
    setModalFormData: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            avatar,
        },
    });

    React.useEffect(() => {
        reset({
            avatar,
        });
    }, [reset, avatar]);

    const onSubmit = (data: FormValues) => {
        setModalFormData(data.avatar);
    };

    return (
        <>
            <div
                className="flex flex-col items-center transition-all duration-300 "
                onClick={openModal}>
                <div className="h-52 w-52">
                    <img
                        src={
                            avatar
                                ? avatar
                                : `/assets/placeholders/profile-placeholder.jpg`
                        }
                        className="rounded-full h-full w-full object-cover"
                        alt="profile"
                    />
                </div>
                <button
                    type="button"
                    className="-mt-4 bg-white px-3 py-1 rounded-xl drop-shadow hover:drop-shadow-lg border hover:border-secondary-300 transition-all duration-300">
                    <MdEdit className="" />
                </button>
            </div>
            <Modal openModal={openModal} isOpen={isModalOpen}>
                <div className="bg-white p-8 relative">
                    <button
                        onClick={closeModal}
                        className="flex items-center gap-1 absolute">
                        <IoArrowBackCircleOutline className="h-10 w-10 text-secondary-450" />
                    </button>
                    <div className="h-52 w-52 mx-auto mb-4 mt-2">
                        <img
                            src={
                                avatar
                                    ? avatar
                                    : `/assets/placeholders/profile-placeholder.jpg`
                            }
                            className="rounded-full h-full w-full object-cover"
                            alt="profile"
                        />
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-76 relative">
                        <InputWithValidation
                            key={CombinedInputConfig.avatar.id}
                            input={CombinedInputConfig.avatar}
                            register={register}
                            errors={errors}
                        />
                        <Button
                            primary
                            sm
                            className="absolute top-0 right-0 h-13">
                            Save
                        </Button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Avatar;
