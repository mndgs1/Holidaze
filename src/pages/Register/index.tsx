import React from "react";
import Heading from "../../components/common/Heading";
import Link from "../../components/common/Link";
import Logo from "../../components/common/Logo";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
    return (
        <>
            <section className={"flex justify-center my-10"}>
                <div className="w-76">
                    <Logo className={"flex justify-center mb-10"} />
                    <Heading h1 className="text-center">
                        Register
                    </Heading>
                    <RegisterForm />
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
