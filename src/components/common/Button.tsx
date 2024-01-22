import className from "classnames";
import { GoSync } from "react-icons/go";

interface ButtonProps {
    children: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    warning?: boolean;
    danger?: boolean;
    loading?: boolean;
    className?: string;
    xxl?: boolean;
    xl?: boolean;
    lg?: boolean;
    md?: boolean;
    sm?: boolean;
    outline?: boolean;
    onClick?: () => void;
}

const Button = ({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    loading,
    outline,
    xl,
    md,
    lg,
    sm,
    onClick,
    ...rest
}: ButtonProps) => {
    const classes = className(
        "flex text-white items-center justify-center border rounded-lg font-heading drop-shadow-xl tracking-wide",
        {
            "opacity-80": loading,
            "bg-primary hover:bg-primary-450": primary,
            "bg-secondary ": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-yellow-400 bg-yellow-400 text-white": warning,
            "border-danger bg-danger text-white": danger,
            "bg-white": outline,
            "text-primary": outline && primary,
            "text-secondary border-secondary": outline && secondary,
            // "text-green-500": outline && success,
            // "text-yellow-400": outline && warning,
            // "text-red-500": outline && danger,
            "h-13 w-76 font-bold text-lg": xl,
            "h-13 w-50": lg,
            "px-3 py-2 text-sm font-semibold shadow-sm inline-flex max-w-28":
                md,
            "px-2": sm,
        },
        rest.className
    );

    return (
        <button
            {...rest}
            disabled={loading}
            className={classes}
            onClick={onClick}>
            {loading ? (
                <>
                    <GoSync className="animate-spin mr-4" />
                    <span className="">Loading...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

Button.propTypes = {
    checkVariationValue: ({
        primary,
        secondary,
        success,
        warning,
        danger,
    }: ButtonProps) => {
        const count =
            Number(!!primary) +
            Number(!!secondary) +
            Number(!!warning) +
            Number(!!success) +
            Number(!!danger);

        if (count > 1) {
            return new Error(
                "Only one of primary, secondary, success, warning, danger can be true"
            );
        }
    },
};

export default Button;
