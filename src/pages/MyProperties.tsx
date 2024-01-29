import React from "react";

import Heading from "../components/common/Heading";
import Hero from "../components/common/Hero";

const MyProperties = () => {
    return (
        <>
            <section>
                <Heading h1>My Properties</Heading>
                <Hero
                    informational
                    statement="You have no active properties"
                    suggestion="Create a property listing and start earning today!"
                    buttonText="Create Listing"
                    navigateTo="/app/myProperties/create"
                />
            </section>
        </>
    );
};

export default MyProperties;
