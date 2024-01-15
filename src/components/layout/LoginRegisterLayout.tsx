import React from "react";

import Logo from "../common/Logo";

import useWindowHeight from "../../hooks/useWindowHeight";

interface LoginRegisterProps {
    children: React.ReactNode;
    register?: boolean;
    login?: boolean;
}

const LoginRegisterLayout = ({
    login,
    register,
    children,
}: LoginRegisterProps) => {
    const windowHeight = useWindowHeight();

    return (
        <div className="lg:grid lg:grid-cols-8">
            <section className="hidden lg:block lg:col-span-5">
                <div className="">
                    <img src="/public/assets/Images/login.jpg" alt="asd"></img>
                </div>
            </section>

            <section
                className={
                    "col-span-3 flex flex-col justify-center min-h-screen items-center relative"
                }>
                <Logo
                    className={`${
                        login &&
                        (windowHeight > 830
                            ? "top-40 absolute left-1/2 transform -translate-x-1/2"
                            : "mb-10")
                    } ${
                        register &&
                        (windowHeight > 1000
                            ? "mb-16 mx-auto"
                            : "mt-12 mb-8 mx-auto")
                    })}`}
                />
                <div className="max-w-76 w-full">{children}</div>
            </section>
        </div>
    );
};

export default LoginRegisterLayout;
