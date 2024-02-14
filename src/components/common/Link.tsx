import { Link as RouterLink } from "react-router-dom";
import classNames from "classnames";
import React from "react";

interface LinkProps extends React.ComponentProps<typeof RouterLink> {
    children: React.ReactNode;
    className?: string;
}

const Link = ({ to, children, className, ...rest }: LinkProps) => {
    const classes = classNames(
        className,
        "text-warning hover:text-warning-450 hover:underline"
    );
    return (
        <RouterLink to={to} className={classes} {...rest}>
            {children}
        </RouterLink>
    );
};

export default Link;
