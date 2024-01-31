import React from "react";

import Heading from "../components/common/Heading";
import Hero from "../components/common/Hero";

import { useToken } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
    const token = useToken();
    const navigate = useNavigate();
    if (!token) {
        navigate("/login");
    }

    return (
        <>
            <section>
                <Heading h1>My Properties</Heading>
                <Hero
                    informational
                    statement="You have no active properties"
                    suggestion="Create a property listing and start earning today!"
                    buttonText="List Property"
                    navigateTo="/app/myProperties/create"
                />
            </section>
        </>
    );
};

export default MyProperties;
