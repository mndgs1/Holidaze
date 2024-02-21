import React from "react";

import { useUserActions } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import { login } from "../api/auth/login";
import { LoggedInUser, UserCredentials } from "../constants/interfaces/user";
import { loginSchema } from "../constants/schemas";
import { LoginInputConfig } from "../constants/inputConfig";

import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Link from "../components/common/Link";
import ServerMessage from "../components/common/ServerMessage";
import InputWithValidation from "../components/common/InputWithValidation";
import LoginRegisterLayout from "../components/layout/LoginRegisterLayout";

const Login = () => {
    const { setUser } = useUserActions();
    const navigate = useNavigate();

    const { isError, error, mutate, isPending } = useMutation({
        mutationFn: (data: UserCredentials) => {
            return login(data);
        },
        onSuccess: (data: LoggedInUser) => {
            setUser(data);
            navigate("/holidaze/properties");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    async function onSubmit(data: UserCredentials) {
        mutate(data);
    }

    return (
        <>
            <LoginRegisterLayout login>
                <Heading h1 className="text-center  mb-9">
                    Welcome back
                </Heading>
                <form
                    className="flex flex-col gap-6 justify-center mb-3"
                    onSubmit={handleSubmit(onSubmit)}>
                    {LoginInputConfig.map((input) => (
                        <InputWithValidation
                            key={input.id}
                            input={input}
                            register={register}
                            errors={errors}
                        />
                    ))}

                    <Button primary xl loading={isPending}>
                        Login
                    </Button>
                </form>
                <div className="flex gap-2 justify-center mb-2">
                    <p>Don't have an account?</p>
                    <Link to="/register">Sign Up</Link>
                </div>
                {isError && (
                    <ServerMessage danger>{error.toString()}</ServerMessage>
                )}
            </LoginRegisterLayout>
        </>
    );
};

export default Login;
