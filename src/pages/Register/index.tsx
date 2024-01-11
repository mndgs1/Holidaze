import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Link from "../../components/Link";
import Logo from "../../components/Logo";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

const Register = () => {
    return (
        <>
            <section className={"flex justify-center h-screen"}>
                <div className="w-76 mt-10">
                    <Logo className={"flex justify-center mb-16"} />
                    <Heading h1 className="text-center">
                        Register
                    </Heading>
                    <form className="flex flex-col gap-5 items-center mb-3">
                        <div className="flex flex-col items-center">
                            <UserIcon
                                height={200}
                                width={200}
                                className="fill-gray-300 hover:fill-gray-200 transition-all"
                            />
                            <div className="-mt-4 bg-white px-3 py-1 drop-shadow rounded-xl">
                                <Edit className="hover:fill-gray-300" />
                            </div>
                        </div>
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
