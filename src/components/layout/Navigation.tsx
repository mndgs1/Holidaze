import React from "react";
import className from "classnames";
import { NavLink } from "react-router-dom";

import Icon from "../common/Icon";
import Text from "../common/Text";

interface NavigationProps {
    className?: string;
}

const NavItems = [
    {
        icon: <Icon search md />,
        text: "Explore",
        to: "/app/properties",
    },
    {
        icon: <Icon luggage md />,
        text: "Trips",
        to: "/app/bookings",
    },
    {
        icon: <Icon home md />,
        text: "Rentals",
        to: "/app/rentals",
    },
    {
        icon: <Icon user md />,
        text: "Profile",
        to: "/app/profile",
    },
];

const Navigation = ({ ...rest }: NavigationProps) => {
    const classes = className("px-6", rest.className);
    return (
        <nav className={classes}>
            <ul className="flex justify-around">
                {NavItems.map((item) => (
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
};

export default Navigation;
