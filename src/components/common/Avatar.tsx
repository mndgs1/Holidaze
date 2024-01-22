import React, { useState } from "react";

import Modal from "./Modal";
import Button from "./Button";
import { MdEdit } from "react-icons/md";

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

    const { register, reset, handleSubmit } = useForm<FormValues>({
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
                    <MdEdit className="" />
                </button>
            </div>
            <Modal openModal={openModal} isOpen={isModalOpen}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2>Modal</h2>
                                <input
                                    placeholder="avatar"
                                    {...register("avatar", { required: true })}
                                />
                                <button>Change</button>
                            </form>
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
        </>
    );
};

export default Avatar;
