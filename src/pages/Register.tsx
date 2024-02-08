import React from "react";

import Button from "../components/common/Button";
import InputWithValidation from "../components/common/InputWithValidation";
import Heading from "../components/common/Heading";
import Link from "../components/common/Link";
import LoginRegisterLayout from "../components/layout/LoginRegisterLayout";
import Avatar from "../components/common/Avatar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registrationSchema } from "../constants/schemas";
import { RegisterInputConfig } from "../constants/inputConfig";
import { registerUser } from "../api/auth/register";
import { User } from "../constants/interfaces/user";

import { useMutation } from "@tanstack/react-query";
import ServerMessage from "../components/common/ServerMessage";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [modalFormData, setModalFormData] = React.useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(registrationSchema),
    });

    React.useEffect(() => {
        setValue("avatar", modalFormData);
    }, [setValue, modalFormData]);

    const { isError, error, isPending, mutate } = useMutation({
        mutationFn: (data: User) => {
            const { name, email, password, venueManager, avatar } = data;
            return registerUser({
                name,
                email,
                password,
                venueManager,
                avatar,
            });
        },
        onSuccess: () => {
            navigate("/login");
            reset();
        },
    });

    const { avatar } = watch();

    function onSubmit(data: User) {
        mutate(data);
    }

    return (
        <LoginRegisterLayout register>
            <Heading h1 className="text-center  mb-9">
                Register
            </Heading>
            <div className="flex flex-col gap-5 items-center">
                <Avatar avatar={avatar} setModalFormData={setModalFormData} />
                <form
                    className="flex flex-col gap-5 items-center mb-3"
                    onSubmit={handleSubmit(onSubmit)}>
                    {RegisterInputConfig.map((input) => (
                        <InputWithValidation
                            key={input.id}
                            input={input}
                            register={register}
                            errors={errors}
                        />
                    ))}

                    <Button primary xl loading={isPending}>
                        Register
                    </Button>
                    {isError && (
                        <ServerMessage danger>{error.toString()}</ServerMessage>
                    )}
                </form>
            </div>
            <div className="flex gap-2 justify-center my-6 lg:mt-0">
                <p>Already have an account?</p>
                <Link to="/login">Log in</Link>
            </div>
        </LoginRegisterLayout>
    );
};
export default Register;
