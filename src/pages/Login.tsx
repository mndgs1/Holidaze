import React, { useState } from "react";

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
import Text from "../components/common/Text";
import InputWithValidation from "../components/common/InputWithValidation";
import LoginRegisterLayout from "../components/layout/LoginRegisterLayout";

const Login = () => {
    const { setUser } = useUserActions();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const loginMutation = useMutation({
        mutationFn: (data: UserCredentials) => {
            setServerError("");

            return login(data);
        },
        onSuccess: (data: LoggedInUser) => {
            console.log("succesfuly logged in", data);
            setUser(data);
            navigate("/properties");
        },
        onError: (error: any) => {
            setServerError(error.message);
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
        console.log("data onSubmit", data);
        loginMutation.mutate(data);
    }

    return (
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

                <Button primary xl>
                    Login
                </Button>
            </form>
            <div className="flex gap-2 justify-center">
                <p>Don't have an account?</p>
                <Link to="/register">Sign Up</Link>
            </div>
            {serverError && (
                <div className="p-2 bg-danger-50 rounded mt-8">
                    <Text>{serverError}</Text>
                </div>
            )}
        </LoginRegisterLayout>
    );
};

export default Login;
