import React, { InputHTMLAttributes, forwardRef, useState } from "react";
import classNames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    id: string;
    label: string;
    danger?: boolean;
    className?: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        { type, id, name, label, className, danger, onBlur, onChange, ...rest },
        ref
    ) => {
        const classes = classNames(
            "w-full h-full border rounded-lg px-2 py-1 hover:border-secondary-300",
            {
                "border-red-200 bg-red-50": danger,
            }
        );

        const [isFocused, setIsFocused] = useState(false);

        // Handle
        const handleOpen = () => setIsFocused(true);

        // Send back label to the middle of the input if the input onBlur
        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            if (onBlur) {
                onBlur(event);
            }
            const input = event.target;
            if (!input.value) setIsFocused(false);
        };

        // Handle onChange to prevent autocomplete overwriting
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event);
            }
            const input = event.target;
            if (input.value) {
                setIsFocused(true);
            }
        };

        // Checkbox Logic
        if (type === "checkbox") {
            return (
                <div className="flex gap-2 items-center">
                    <input
                        type={type}
                        id={id}
                        name={name}
                        className={`h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded`}
                        ref={ref}
                        {...rest}
                    />
                    <label
                        htmlFor={id}
                        className={danger ? "text-red-500" : "text-secondary"}>
                        {label}
                    </label>
                </div>
            );
        }

        // Standard Input Logic
        return (
            <div className="relative w-full h-13">
                <label
                    htmlFor={id}
                    className={`absolute ml-4 top-1/2 transition-all -translate-y-2/4 ${
                        danger ? "text-secondary" : "text-secondary-400"
                    } ${
                        isFocused
                            ? "bg-white rounded-xl px-1 text-sm transform translate-y-[-180%] translate-x-[-10%] text-secondary-600 origin-top-left"
                            : ""
                    }`}>
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    name={name}
                    className={`${classes} ${isFocused ? "" : ""}`}
                    onFocus={handleOpen}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    }
);

export default Input;
