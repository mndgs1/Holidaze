import React from "react";
import Heading from "../components/common/Heading";
import PropertyForm from "../components/forms/PropertyForm";
import Seo from "../components/layout/Seo";

const CreatePropertyListing = () => {
    return (
        <>
            <Seo title="Create Listing" />
            <Heading h1>Create Property Listing</Heading>
            <PropertyForm />
        </>
    );
};

export default CreatePropertyListing;
