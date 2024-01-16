import React from "react";
import className from "classnames";
import { FaSuitcaseRolling, FaSearch, FaUserCircle } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import Text from "../common/Text";

interface NavigationProps {
    className?: string;
}

const NavItems = [
    {
        icon: <FaSearch />,
        text: "Explore",
        to: "/properties",
    },
    {
        icon: <FaSuitcaseRolling />,
        text: "Trips",
        to: "/bookings",
    },
    {
        icon: <FaHouse />,
        text: "Rentals",
        to: "/rentals",
    },
    {
        icon: <FaUserCircle />,
        text: "Profile",
        to: "/profile",
    },
];

const Navigation = ({ ...rest }: NavigationProps) => {
    const classes = className("mx-6", rest.className);
    return (
        <nav className={classes}>
            <ul className="flex justify-around">
                {NavItems.map((item) => (
                    <NavLink to={item.to}>
                        {({ isActive }) => (
                            <li
                                className={[
                                    "flex flex-col items-center justify-center hover:underline",
                                    isActive ? "hover:no-underline" : "",
                                ].join(" ")}>
                                {React.cloneElement(item.icon, {
                                    className: [
                                        "w-6 h-6",
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

{
    /* <NavLink to={item.to}>
<li className="flex flex-col items-center justify-center">
    {item.icon}
    <Text secondary sm className="leading-tight">
        {item.text}
    </Text>
</li>
</NavLink> */
}
