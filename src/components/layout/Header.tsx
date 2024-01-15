import React from "react";
import className from "classnames";
import Logo from "../common/Logo";

interface HeaderProps {
    className?: string;
}

const Header = ({ ...rest }: HeaderProps) => {
    const classes = className(
        "mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl h-21 flex justify-space-between items-center ",
        rest.className
    );
    return (
        <header className={""}>
            <div className={classes} {...rest}>
                <Logo />
            </div>
        </header>
    );
};

export default Header;
