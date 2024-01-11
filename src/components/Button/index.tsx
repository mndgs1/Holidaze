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
    ...rest
}: ButtonProps) => {
    const classes = className(
        rest.className,
        "flex items-center justify-center border rounded-lg text-lg font-heading w-full font-bold drop-shadow-xl tracking-wide",
        {
            "opacity-80": loading,
            " text-white bg-primary hover:bg-primary-600": primary,
            "border-gray-900 bg-gray-900 text-white": secondary,
            "border-green-500 bg-green-500 text-white": success,
            "border-yellow-400 bg-yellow-400 text-white": warning,
            "border-red-500 bg-red-500 text-white": danger,
            "h-13 max-w-76": xl,
        }
    );

    return (
        <button {...rest} disabled={loading} className={classes}>
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
