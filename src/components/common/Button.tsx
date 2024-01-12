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
    xl,
    md,
    lg,
    onClick,
    ...rest
}: ButtonProps) => {
    const classes = className(
        "flex items-center justify-center border rounded-lg font-heading w-full  drop-shadow-xl tracking-wide",
        {
            "opacity-80": loading,
            "text-white bg-primary hover:bg-primary-450": primary,
            "border-gray-900 bg-gray-900 text-white": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-yellow-400 bg-yellow-400 text-white": warning,
            "border-danger bg-danger text-white": danger,
            "h-13 max-w-76 font-bold text-lg": xl,
            "h-10": lg,
            "px-3 py-2 text-sm font-semibold shadow-sm inline-flex max-w-28":
                md,
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
                <div>
                    <GoSync className="animate-spin" /> Proccessing
                </div>
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
