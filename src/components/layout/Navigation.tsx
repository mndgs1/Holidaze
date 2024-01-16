import React from "react";
import className from "classnames";
import { FaSuitcase } from "react-icons/fa6";
import { PiSuitcaseRollingBold } from "react-icons/pi";

interface NavigationProps {
    className?: string;
}

const Navigation = ({ ...rest }: NavigationProps) => {
    const classes = className("", rest.className);
    return (
        <nav className={classes}>
            <ul className="flex">
                <li></li>
                <li>
                    <PiSuitcaseRollingBold className="w-7 h-7" />
                </li>
                <li></li>
                <li></li>
            </ul>
        </nav>
    );
};

export default Navigation;
