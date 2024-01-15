import React from "react";

import { useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <>
            {pathname === "/login" || pathname === "/register" ? null : (
                <Header />
            )}
            <main className="mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-34 2xl:mx-40 3xl:mx-auto max-w-screen-2xl">
                {children}
            </main>
            {pathname === "/login" || pathname === "/register" ? null : (
                <Footer />
            )}
        </>
    );
};

export default Layout;
