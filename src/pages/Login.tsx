import React, { useState } from "react";

import { useUserActions } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import { login } from "../api/auth/login";
import { LoggedInUser, UserCredentials } from "../constants/interfaces";
import { loginSchema } from "../constants/schemas";
import { LoginInputConfig } from "../constants/inputConfig";

import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Link from "../components/common/Link";
import Logo from "../components/common/Logo";
import Text from "../components/common/Text";
import InputWithValidation from "../components/common/InputWithValidation";

const Login = () => {
    const { setUser } = useUserActions();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const loginMutation = useMutation({
        mutationFn: (data: UserCredentials) => {
            setServerError("");

            console.log("data", data);
            const { email, password } = data;
            return login({ email, password });
        },
        onSuccess: (data: LoggedInUser) => {
            setUser(data);
            navigate("/explore");
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
        <>
            <Logo
                className={"absolute left-1/2 transform -translate-x-1/2 mt-16"}
            />
            <section className={"flex items-center justify-center h-screen"}>
                <div className="w-76">
                    <Heading h1 className="text-center">
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
                </div>
            </section>
        </>
    );
};

export default Login;
