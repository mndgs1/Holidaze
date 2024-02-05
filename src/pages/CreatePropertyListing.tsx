import React from "react";
import Heading from "../components/common/Heading";
import PropertyForm from "../components/forms/PropertyForm";

const CreatePropertyListing = () => {
    return (
        <>
            <Heading h1>Create Property Listing</Heading>
            <PropertyForm />
        </>
    );
};

export default CreatePropertyListing;
