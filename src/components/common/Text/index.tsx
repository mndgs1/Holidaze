import React from "react";
import className from "classnames";

interface TextProps {
    children: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
    xl?: boolean;
    lg?: boolean;
    sm?: boolean;
    className?: string;
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
            "font-weight-400": secondary,
            "text-primary": success,
            "text-red-600": danger,
            "text-xl": xl,
            "text-lg": lg,
            "text-sm": sm,
        },
        rest.className
    );

    return (
        <p className={classes} {...rest}>
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
