import React from "react";
import className from "classnames";

interface FooterProps {
    className?: string;
}

const Footer = ({ ...rest }: FooterProps) => {
    const classes = className("", rest.className);

    return (
        <footer className={classes} {...rest}>
            Footer
        </footer>
    );
};

export default Footer;
