import React from "react";
import className from "classnames";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    h4?: boolean;
}
const Heading = ({ h1, h2, h3, h4, children, ...rest }: HeadingProps) => {
    const classes = className(
        "font-heading font-bold text-secondary",
        {
            "text-3xl md:text-4xl mb-4": h1,
            "text-2xl md:text-3xl": h2,
            "text-xl md:text-2xl": h3,
            "text-lg md:text-xl": h4,
        },
        rest.className
    );

    return h1 ? (
        <h1 className={classes}>{children}</h1>
    ) : h2 ? (
        <h2 className={classes}>{children}</h2>
    ) : h3 ? (
        <h3 className={classes}>{children}</h3>
    ) : h4 ? (
        <h4 className={classes}>{children}</h4>
    ) : null;
};

export default Heading;
