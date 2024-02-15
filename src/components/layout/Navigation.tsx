import React from "react";
import className from "classnames";
import { NavLink } from "react-router-dom";
import { useToken } from "../../stores/useUserStore";
import { Link as RouterLink } from "react-router-dom";

import Icon from "../common/Icon";
import Text from "../common/Text";
import Button from "../common/Button";

interface NavigationProps {
    className?: string;
}

const LoggedInNavItems = [
    {
        icon: <Icon search md />,
        text: "Explore",
        to: "/holidaze/properties",
    },
    {
        icon: <Icon luggage md />,
        text: "Trips",
        to: "/holidaze/bookings",
    },
    {
        icon: <Icon home md />,
        text: "Rentals",
        to: "/holidaze/myProperties",
    },
    {
        icon: <Icon user md />,
        text: "Profile",
        to: "/holidaze/profile",
    },
];

const LoggedOutNavItems = [
    { text: "Home", to: "/" },
    {
        text: "About",
        to: "/about",
    },
];

const Navigation = ({ ...rest }: NavigationProps) => {
    const token = useToken();
    const isLoggedIn = !!token;

    const classes = className("z-50", rest.className);
    if (isLoggedIn)
        return (
            <nav className={classes}>
                <ul className="flex justify-around sm:justify-between sm:gap-6">
                    {LoggedInNavItems.map((item) => (
                        <NavLink key={item.text} to={item.to}>
                            {({ isActive }) => (
                                <li
                                    className={[
                                        "flex flex-col items-center justify-center hover:underline",
                                        isActive ? "hover:no-underline" : "",
                                    ].join(" ")}>
                                    {React.cloneElement(item.icon, {
                                        className: [
                                            isActive
                                                ? "fill-primary"
                                                : "fill-secondary",
                                        ].join(" "),
                                    })}
                                    <Text
                                        sm
                                        className={[
                                            "leading-tight",
                                            isActive
                                                ? "font-semibold text-primary"
                                                : "text-secondary",
                                        ].join(" ")}>
                                        {item.text}
                                    </Text>
                                </li>
                            )}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        );

    // No user navigation
    return (
        <nav className={classes}>
            <ul className="flex justify-between gap-3 sm:gap-6 items-center">
                {LoggedOutNavItems.map((item) => (
                    <li key={item.text}>
                        <NavLink to={item.to}>
                            {({ isActive }) => (
                                <Text
                                    sm
                                    className={[
                                        "leading-tight sm:text-base hover:underline",
                                        isActive
                                            ? "font-semibold text-primary hover:no-underline"
                                            : "text-secondary",
                                    ].join(" ")}>
                                    {item.text}
                                </Text>
                            )}
                        </NavLink>
                    </li>
                ))}
                <li>
                    <Button sm secondary>
                        <RouterLink to="/login">Login</RouterLink>
                    </Button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
