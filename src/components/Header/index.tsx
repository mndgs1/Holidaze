import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();

    if (pathname === "/login" || pathname === "/register") {
        return null;
    }

    return <div>Header</div>;
};

export default Header;
