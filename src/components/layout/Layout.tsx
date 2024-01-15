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
                <Header className="max-w-screen-2xl" />
            )}
            <main className="max-w-screen-2xl">{children}</main>
            {pathname === "/login" || pathname === "/register" ? null : (
                <Footer className="max-w-screen-2xl" />
            )}
        </>
    );
};

export default Layout;
