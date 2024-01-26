import React, { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";
import Icon from "./Icon";
import InputWithValidation from "./InputWithValidation";
import { CombinedInputConfig } from "../../constants/inputConfig";

// import useImageValidator from "../../hooks/useImageValidator";

import { User } from "../../constants/interfaces/user";

import { useForm } from "react-hook-form";

type FormValues = { avatar: string };

interface AvatarProps {
    avatar: string | undefined;
    setModalFormData: React.Dispatch<React.SetStateAction<string>>;
    user?: User;
}

const Avatar = ({ avatar, setModalFormData, user }: AvatarProps) => {
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
                                : user?.avatar
                                ? user.avatar
                                : `/assets/placeholders/profile-placeholder.jpg`
                        }
                        className="rounded-full h-full w-full object-cover"
                        alt="profile"
                    />
                </div>
                <button
                    type="button"
                    className="-mt-4 bg-white px-3 py-1 rounded-xl drop-shadow hover:drop-shadow-lg border hover:border-secondary-300 transition-all duration-300">
                    <Icon edit sm />
                </button>
            </div>
            <Modal openModal={openModal} isOpen={isModalOpen}>
                <div className="bg-white p-8 relative">
                    <button
                        onClick={closeModal}
                        className="flex items-center gap-1 absolute">
                        <Icon back xl className="text-secondary-450" />
                    </button>
                    <div className="h-52 w-52 mx-auto mb-4 mt-2">
                        <img
                            src={
                                avatar
                                    ? avatar
                                    : user?.avatar
                                    ? user.avatar
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
