import React from "react";
import className from "classnames";

interface HeadingProps {
    children: React.ReactNode;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    className?: string;
}
const Heading = ({ h1, h2, h3, children, ...rest }: HeadingProps) => {
    const classes = className(
        "text-secondary font-heading font-bold",
        {
            "text-3xl mb-9": h1,
            "text-2xl": h2,
            "text-xl": h3,
        },
        rest.className
    );

    return h1 ? (
        <h1 className={classes}>{children}</h1>
    ) : h2 ? (
        <h2 className={classes}>{children}</h2>
    ) : h3 ? (
        <h3 className={classes}>{children}</h3>
    ) : null;
};

export default Heading;
