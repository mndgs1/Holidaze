import React from "react";
import className from "classnames";

interface HeaderProps {
    className?: string;
}

const Header = ({ ...rest }: HeaderProps) => {
    const classes = className("", rest.className);
    return (
        <header className={classes} {...rest}>
            Header
        </header>
    );
};

export default Header;
