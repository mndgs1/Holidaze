import { Link as RouterLink } from "react-router-dom";

import React from "react";

interface LinkProps extends React.ComponentProps<typeof RouterLink> {
    children: React.ReactNode;
}

const Link = ({ to, children, ...rest }: LinkProps) => {
    return (
        <RouterLink
            to={to}
            className={"text-warning underline hover:text-warning-600"}
            {...rest}>
            {children}
        </RouterLink>
    );
};

export default Link;
