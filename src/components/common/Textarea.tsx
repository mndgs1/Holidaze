import React, {
    TextareaHTMLAttributes,
    forwardRef,
    useState,
    useEffect,
} from "react";
import className from "classnames";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    danger?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ id, name, label, danger, onBlur, onChange, ...rest }, ref) => {
        const classes = className(
            "w-full h-full border rounded-lg px-2 py-1 hover:border-secondary-300 py-2 px-3",
            {
                "border-danger-200 bg-danger-50": danger,
            },
            rest.className
        );

        const [isFocused, setIsFocused] = useState(false);

        // Handle
        const handleOpen = () => setIsFocused(true);

        useEffect(() => {
            if (rest.defaultValue) {
                setIsFocused(true);
            }
        }, [rest.defaultValue]);

        // Send back label to the middle of the input if the input onBlur
        const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            if (onBlur) {
                onBlur(event);
            }
            const input = event.target;
            if (!input.value) setIsFocused(false);
        };

        // Handle onChange to prevent autocomplete overwriting
        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            if (onChange) {
                onChange(event);
            }
            const input = event.target;
            if (input.value) {
                setIsFocused(true);
            }
        };

        return (
            <div className="relative w-full h-64">
                <label
                    htmlFor={id}
                    className={`absolute ml-4 top-6 transition-all -translate-y-2/4 accent-primary ${
                        danger ? "text-secondary" : "text-secondary-400"
                    } ${
                        isFocused
                            ? "bg-white rounded-xl px-1 text-sm transform translate-y-[-170%] translate-x-[-10%] text-secondary-600 origin-top-left"
                            : ""
                    }`}>
                    {label}
                </label>
                <textarea
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

export default Textarea;
