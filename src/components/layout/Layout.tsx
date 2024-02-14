import React from "react";

import { useLocation } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import useOnScrollUp from "../../hooks/useOnScrollUp";

import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { pathname } = useLocation();
    const isMobile = useIsMobile();
    const isHeaderVisible = useOnScrollUp();

    if (pathname.includes("/login") || pathname.includes("/register")) {
        return (
            <>
                <main>{children}</main>
            </>
        );
    }
    if (pathname.includes("/holidaze/"))
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="sm:grow">
                    <div
                        className={
                            "pt-24 mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl "
                        }>
                        {children}
                    </div>
                </main>
                {isMobile && (
                    <Navigation
                        className={`fixed flex flex-col justify-center bottom-0 left-0 right-0 h-14 bg-white border-t border-secondary-100 ${
                            !isHeaderVisible
                                ? "transform translate-y-full transition-all duration-300"
                                : "transform translate-y-0 transition-all duration-300"
                        }`}></Navigation>
                )}
                <Footer />
            </div>
        );
    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <main
                className={
                    "z-10 pt-24 mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl grow"
                }>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
