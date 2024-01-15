import React from "react";
import className from "classnames";

import Text from "../common/Text";

interface FooterProps {
    className?: string;
}

const Footer = ({ ...rest }: FooterProps) => {
    const classes = className(
        "mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl",
        rest.className
    );

    return (
        <footer className={""} {...rest}>
            <div className={classes} {...rest}>
                <Text primary>Footer </Text>
            </div>
        </footer>
    );
};

export default Footer;
