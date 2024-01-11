import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <>
            {pathname === "/login" || pathname === "/register" ? null : (
                <Header />
            )}
            <main>{children}</main>
            {pathname === "/login" || pathname === "/register" ? null : (
                <Footer />
            )}
        </>
    );
};

export default Layout;
