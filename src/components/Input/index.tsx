import React, { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    id: string;
    name: string;
    label: string;
}

const Input = ({ type, id, name, label, ...rest }: InputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleBlur = () => {
        const input = document.getElementById(id) as HTMLInputElement;
        if (!input.value) setIsOpen(false);
    };

    return (
        <div className="relative w-full h-13">
            <label
                htmlFor={id}
                className={`absolute ml-4 top-1/2 transition-all -translate-y-2/4 text-secondary-400 ${
                    isOpen
                        ? "bg-white rounded-xl px-1 text-sm transform translate-y-[-180%] translate-x-[-10%] text-secondary-600 origin-top-left"
                        : ""
                }`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                className={`w-full h-full border rounded-lg px-2 py-1 ${
                    isOpen ? "" : ""
                }`}
                onFocus={handleOpen}
                onBlur={handleBlur}
                {...rest}
            />
        </div>
    );
};

export default Input;
