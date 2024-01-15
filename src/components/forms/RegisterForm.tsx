import React, { useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button";
import Text from "../common/Text";
import InputWithValidation from "../common/InputWithValidation";

import { Dialog } from "@headlessui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registrationSchema } from "../../constants/schemas";
import { RegisterInputConfig } from "../../constants/inputConfig";
import { registerUser } from "../../api/auth/registerUser";

import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { User } from "../../constants/interfaces/user";
import { useMutation } from "@tanstack/react-query";

// For Error. I want to send it up to the page.
// Should I use global state? Or get the prop up the tree?
// Register Form Component
const RegisterForm = ({ error, ...rest }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(registrationSchema),
    });

    const registerMutation = useMutation({
        mutationFn: (data: User) => {
            setIsLoading(true);
            setServerError("");

            console.log("data", data);
            const { name, email, password, venueManager, avatar } = data;
            return registerUser({
                name,
                email,
                password,
                venueManager,
                avatar,
            });
        },
        onSuccess: (data: User) => {
            console.log("succesfuly registered", data);
            reset();
        },
        onError: (error: any) => {
            console.log(error);
            setServerError(error.message);
        },
        onSettled: () => setIsLoading(false),
    });

    function onSubmit(data: User) {
        // Why does it send in repeat password? it does not check for types
        console.log("data onSubmit", data);
        registerMutation.mutate(data);
    }

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

            {RegisterInputConfig.map((input) => (
                <InputWithValidation
                    key={input.id}
                    input={input}
                    register={register}
                    errors={errors}
                />
            ))}

            <Button primary xl loading={isLoading}>
                Register
            </Button>
            <UserAvatarModal
                openModal={openModal}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
            />

            {serverError && (
                <div className="p-2 bg-danger-50 rounded mt-8">
                    <Text>{serverError}</Text>
                </div>
            )}
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
