import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Link from "../../components/Link";
import Logo from "../../components/Logo";

const Login = () => {
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
                    <form className="flex flex-col gap-6 justify-center mb-3">
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            label="Email address"
                            autoFocus
                        />
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                        />
                        <Button primary xl>
                            Login
                        </Button>
                    </form>
                    <div className="flex gap-2 justify-center">
                        <p>Don't have an account?</p>
                        <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
