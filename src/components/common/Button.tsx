import className from "classnames";
import Icon from "./Icon";

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
        "flex items-center justify-center border rounded-lg font-heading drop-shadow-xl tracking-wide",
        {
            "opacity-80": loading,
            "bg-primary hover:bg-primary-450 text-white": primary,
            "bg-secondary text-white": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-yellow-400 bg-yellow-400 text-white": warning,
            "border-danger bg-danger text-white": danger,
            "bg-white": outline,
            "text-primary border-primary": outline && primary,
            "text-secondary border-secondary": outline && secondary,
            // "text-green-500": outline && success,
            // "text-yellow-400": outline && warning,
            // "text-red-500": outline && danger,
            "h-13 w-76 font-bold text-lg": xl,
            "h-10": lg,
            "px-3 py-2 w-28": md,
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
                    <Icon refresh className="mr-4 animate-spin" />
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
