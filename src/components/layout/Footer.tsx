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
                    <button className="hover:opacity-80">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer">
                            <Icon facebook md className="fill-secondary" />
                        </a>
                    </button>
                    <button className="hover:opacity-80">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer">
                            <Icon instagram md className="fill-secondary" />
                        </a>
                    </button>
                    <button className="hover:opacity-80">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer">
                            <Icon twitter md className="fill-secondary" />
                        </a>
                    </button>
                    <button className="hover:opacity-80">
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noreferrer">
                            <Icon youtube md className="fill-secondary" />
                        </a>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
