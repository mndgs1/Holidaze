import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";

const Page404 = () => {
    return (
        <section>
            <Heading>Ooops! Something went wrong</Heading>
            <Text primary>The page you are looking for does not exist.</Text>
            <Link to="/">
                <Button primary md>
                    Back to home
                </Button>
            </Link>
        </section>
    );
};

export default Page404;
