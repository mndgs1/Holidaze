import React from "react";
import className from "classnames";
import Logo from "../common/Logo";

import useOnScrollUp from "../../hooks/useOnScrollUp";
import useIsMobile from "../../hooks/useIsMobile";
interface HeaderProps {
    className?: string;
}

const Header = ({ ...rest }: HeaderProps) => {
    const isHeaderVisible = useOnScrollUp();
    const isMobile = useIsMobile();

    const classes = className(
        `mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl h-21 flex items-center justify-between`,
        rest.className
    );
    return (
        <header
            className={`drop-shadow-md fixed w-full top-0 left-0 right-0 bg-white ${
                !isHeaderVisible
                    ? "transform -translate-y-full transition-all duration-300"
                    : "transform translate-y-0 transition-all duration-300"
            }`}>
            <div className={classes} {...rest}>
                <Logo />
                <div className="h-10 w-20 bg-primary"></div>
                {!isMobile && <div className="h-10 w-20 bg-primary">Nav</div>}
            </div>
        </header>
    );
};

export default Header;
