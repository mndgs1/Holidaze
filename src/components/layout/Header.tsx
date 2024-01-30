import React from "react";
import className from "classnames";
import Logo from "../common/Logo";
import Search from "../common/Search";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";

import useOnScrollUp from "../../hooks/useOnScrollUp";
import useIsMobile from "../../hooks/useIsMobile";
interface HeaderProps {
    className?: string;
}

const Header = ({ ...rest }: HeaderProps) => {
    const { pathname } = useLocation();

    console.log(pathname);
    const isHeaderVisible = useOnScrollUp();
    const isMobile = useIsMobile();

    const classes = className(
        `mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl h-21 flex items-center justify-between gap-12 lg:gap-20`,
        rest.className
    );
    return (
        <header
            className={`drop-shadow-md fixed w-full top-0 left-0 right-0 bg-white border-b border-secondary-100 z-50 ${
                !isHeaderVisible
                    ? "transform -translate-y-full transition-all duration-300"
                    : "transform translate-y-0 transition-all duration-300"
            }`}>
            <div className={classes} {...rest}>
                <Logo />
                {pathname.includes("/app/") && <Search />}
                {(!isMobile || !pathname.includes("/app/")) && <Navigation />}
            </div>
        </header>
    );
};

export default Header;
