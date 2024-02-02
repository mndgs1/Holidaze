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
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    id?: string;
}

const Button = ({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    loading,
    xl,
    md,
    lg,
    sm,
    onClick,
    ...rest
}: ButtonProps) => {
    const classes = className(
        rest.className,
        "flex items-center justify-center border rounded-lg font-heading drop-shadow-xl tracking-wide",
        {
            "opacity-80": loading,
            "bg-primary hover:bg-primary-450 border-primary text-white":
                primary,
            "bg-secondary hover:bg-secondary-450 text-white": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-warning bg-warning text-white": warning,
            "border-danger bg-danger hover:bg-danger-400 hover:border-danger-400 text-white":
                danger,
            "h-13 w-76 font-bold text-lg": xl,
            "h-10": lg,
            "px-3 py-2 w-28": md,
            "px-3 py-2 text-sm": sm,
        }
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
