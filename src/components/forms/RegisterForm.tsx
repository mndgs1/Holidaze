import React, { useState } from "react";

import Input from "../common/Input";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Text from "../common/Text";

import { Dialog } from "@headlessui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./schemas";

import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

const RegisterInputConfig = [
    {
        type: "text",
        id: "name",
        label: "Name",
        autoFocus: true,
        message: "Name must be minimum 4 characters",
    },
    {
        type: "text",
        id: "email",
        label: "Email address",
        message: "Email must be a valid @stud.noroff.no",
    },
    {
        type: "text",
        id: "repeatEmail",
        label: "Repeat email address",
    },
    {
        type: "password",
        id: "password",
        label: "Password",
        message: "Password must be minimum 6 characters",
    },
    {
        type: "password",
        id: "repeatPassword",
        label: "Repeat password",
    },
];

// Register Form Component
const RegisterForm = ({ ...rest }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(registrationSchema),
    });

    function onSubmit(data: { name: string; email: string; password: string }) {
        console.log(data);
        reset();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <form
            className="flex flex-col gap-5 items-center mb-3"
            {...rest}
            onSubmit={handleSubmit(onSubmit)}>
            <div
                className="flex flex-col items-center transition-all duration-300 hover:opacity-85"
                onClick={openModal}>
                <UserIcon height={200} width={200} className="fill-gray-300" />
                <button
                    type="button"
                    className="-mt-4 bg-white px-3 py-1 rounded-xl drop-shadow hover:drop-shadow-lg border hover:border-secondary-300 transition-all duration-300">
                    <Edit className="" />
                </button>
            </div>
            {RegisterInputConfig.map((input) => {
                const fieldId = input.id as
                    | "name"
                    | "email"
                    | "repeatEmail"
                    | "password"
                    | "repeatPassword";

                return (
                    <div className="flex flex-col gap-1 w-full" key={input.id}>
                        <Input
                            type={input.type}
                            id={input.id}
                            label={input.label}
                            autoFocus={input.autoFocus || false}
                            {...register(fieldId)}
                            danger={!!errors[fieldId]?.message}
                        />
                        {errors[fieldId]?.message && (
                            <Text danger sm>
                                {errors[fieldId]?.message}
                            </Text>
                        )}
                    </div>
                );
            })}

            <Button primary xl>
                Register
            </Button>
            <UserAvatarModal
                openModal={openModal}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
            />
        </form>
    );
};

export default RegisterForm;

// User Avatar Modal Component using Modal skeleton
const UserAvatarModal: React.FC<{
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
}> = ({ openModal, closeModal, isModalOpen }) => {
    return (
        <Modal openModal={openModal} isOpen={isModalOpen}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900">
                            Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to deactivate your
                                account? All of your data will be permanently
                                removed. This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button primary lg onClick={closeModal}>
                    Deactivate
                </Button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
};
