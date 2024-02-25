import React from "react";
import className from "classnames";

import Text from "../common/Text";
import Icon from "../common/Icon";

interface FooterProps {
    className?: string;
}

const Footer = ({ ...rest }: FooterProps) => {
    const classes = className(
        "px-6 sm:px-10 md:px-16 lg:px-24 xl:px-34 2xl:px-40 3xl:px-auto border-t border-secondary-100 mt-8 mb-16 sm:mb-0",
        rest.className
    );

    return (
        <footer className={classes} {...rest}>
            <div
                className={
                    "max-w-screen-2xl flex flex-col gap-4 justify-between items-center py-4 md:flex-row mx-auto"
                }>
                <Text secondary>© 2024 Holidaze Inc. All rights reserved.</Text>
                <div className="flex gap-4">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="facebook"
                        className="hover:opacity-80">
                        <Icon facebook md className="fill-secondary" />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="instagram"
                        className="hover:opacity-80">
                        <Icon instagram md className="fill-secondary" />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="twitter"
                        className="hover:opacity-80">
                        <Icon twitter md className="fill-secondary" />
                    </a>
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="youtube"
                        className="hover:opacity-80">
                        <Icon youtube md className="fill-secondary" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
