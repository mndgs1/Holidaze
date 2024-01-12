import React from "react";
import className from "classnames";

interface TextProps {
    children: React.ReactNode;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
    xl?: boolean;
    lg?: boolean;
    sm?: boolean;
}

const Text = ({
    primary,
    secondary,
    danger,
    success,
    children,
    xl,
    lg,
    sm,
    ...rest
}: TextProps) => {
    const classes = className(
        "font-text",
        {
            "text-secondary": primary,
            "font-light": secondary,
            "text-primary": success,
            "text-red-600": danger,
            "text-xl": xl,
            "text-lg": lg,
            "text-sm": sm,
        },
        rest.className
    );

    return (
        <p {...rest} className={classes}>
            {children}
        </p>
    );
};

Text.propTypes = {
    checkVariationValue: ({
        primary,
        secondary,
        success,
        danger,
    }: TextProps) => {
        const count =
            Number(!!primary) +
            Number(!!secondary) +
            Number(!!success) +
            Number(!!danger);

        if (count > 1) {
            return new Error(
                "Only one of primary, secondary, success, warning, danger can be true"
            );
        }
    },
};

export default Text;
