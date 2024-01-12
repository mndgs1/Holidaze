import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Link from "../../components/Link";
import Logo from "../../components/Logo";
import Modal from "../../components/Modal";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { Dialog } from "@headlessui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState, useRef } from "react";

const Register = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <section className={"flex justify-center my-10"}>
                <div className="w-76">
                    <Logo className={"flex justify-center mb-10"} />
                    <Heading h1 className="text-center">
                        Register
                    </Heading>
                    <form className="flex flex-col gap-5 items-center mb-3">
                        <div
                            className="flex flex-col items-center transition-all duration-300 hover:opacity-85"
                            onClick={openModal}>
                            <UserIcon
                                height={200}
                                width={200}
                                className="fill-gray-300"
                            />
                            <div className="-mt-4 bg-white px-3 py-1 rounded-xl drop-shadow hover:drop-shadow-lg border hover:border-secondary-300 transition-all duration-300">
                                <Edit className="" />
                            </div>
                        </div>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            autoFocus
                        />
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            label="Email address"
                        />
                        <Input
                            type="text"
                            id="repeatEmail"
                            name="repeatEmail"
                            label="Repeat email address"
                        />
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                        />
                        <Input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            label="Repeat password"
                        />
                        <Button primary xl>
                            Register
                        </Button>
                    </form>
                    <div className="flex gap-2 justify-center">
                        <p>Already have an account?</p>
                        <Link to="/login">Log in</Link>
                    </div>
                </div>
            </section>
            <UserAvatarModal
                openModal={openModal}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
            />
        </>
    );
};
export default Register;

// User Avatar Modal Component using Modal skeleton
const UserAvatarModal: React.FC<{
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
}> = ({ openModal, closeModal, isModalOpen }) => {
    const cancelButtonRef = useRef(null);

    return (
        <Modal openModal={openModal} isOpen={isModalOpen} ref={cancelButtonRef}>
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
                    onClick={closeModal}
                    ref={cancelButtonRef}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
};
