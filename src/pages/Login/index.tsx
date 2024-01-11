import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Link from "../../components/Link";
import Logo from "../../components/Logo";

const Login = () => {
    return (
        <>
            <section className={"flex justify-center h-screen"}>
                <div className="w-76 mt-20">
                    <Logo className={"flex justify-center mb-16"} />
                    <Heading h1 className="text-center">
                        Welcome back
                    </Heading>
                    <form className="flex flex-col gap-5 justify-center mb-3">
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
