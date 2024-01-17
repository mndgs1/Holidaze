import React, { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const Avatar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className="flex flex-col items-center transition-all duration-300 "
                onClick={openModal}>
                <img
                    src="/assets/placeholders/profile-placeholder.jpg"
                    alt="profile"
                    height={200}
                    width={200}
                    className="hover:opacity-80"
                />
                <button
                    type="button"
                    className="-mt-4 bg-white px-3 py-1 rounded-xl drop-shadow hover:drop-shadow-lg border hover:border-secondary-300 transition-all duration-300">
                    <FaEdit className="fill-secondary-400" />
                </button>
            </button>
            <UserAvatarModal
                openModal={openModal}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
            />
        </>
    );
};

export default Avatar;

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
