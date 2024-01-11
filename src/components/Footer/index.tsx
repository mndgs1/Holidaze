import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const { pathname } = useLocation();

    if (pathname === "/login" || pathname === "/register") {
        return null;
    }

    return <div>Footer</div>;
};

export default Footer;
