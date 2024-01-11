import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Link from "../../components/Link";
import Logo from "../../components/Logo";

const Register = () => {
    return (
        <>
            <section className={"flex justify-center h-screen"}>
                <div className="w-76 mt-10">
                    <Logo className={"flex justify-center mb-16"} />
                    <Heading h1 className="text-center">
                        Register
                    </Heading>
                    <form className="flex flex-col gap-5 justify-center mb-3">
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            autoFocus
                        />
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            label="Email address"
                        />
                        <Input
                            type="text"
                            id="repeat-email"
                            name="repeat-email"
                            label="Repeat email address"
                        />
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                        />
                        <Input
                            type="password"
                            id="repeat-password"
                            name="repeat-password"
                            label="Repeat password"
                        />
                        <Button primary xl>
                            Log In
                        </Button>
                    </form>
                    <div className="flex gap-2 justify-center">
                        <p>Already have an account?</p>
                        <Link to="/login">Log in</Link>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Register;
