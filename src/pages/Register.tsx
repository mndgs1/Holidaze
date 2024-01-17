import React, { useState } from "react";

import Button from "../components/common/Button";
import Text from "../components/common/Text";
import InputWithValidation from "../components/common/InputWithValidation";
import Heading from "../components/common/Heading";
import Link from "../components/common/Link";
import LoginRegisterLayout from "../components/layout/LoginRegisterLayout";
import Avatar from "../components/common/Avatar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registrationSchema } from "../constants/schemas";
import { RegisterInputConfig } from "../constants/inputConfig";
import { registerUser } from "../api/auth/registerUser";
import { User } from "../constants/interfaces/user";

import { useMutation } from "@tanstack/react-query";

const Register = () => {
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
    return (
        <LoginRegisterLayout register>
            <Heading h1 className="text-center  mb-9">
                Register
            </Heading>
            <form
                className="flex flex-col gap-5 items-center mb-3"
                onSubmit={handleSubmit(onSubmit)}>
                <Avatar />
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
                {serverError && (
                    <div className="p-2 bg-danger-50 rounded mt-8">
                        <Text>{serverError}</Text>
                    </div>
                )}
            </form>
            <div className="flex gap-2 justify-center my-6 lg:mt-0">
                <p>Already have an account?</p>
                <Link to="/login">Log in</Link>
            </div>
        </LoginRegisterLayout>
    );
};
export default Register;
