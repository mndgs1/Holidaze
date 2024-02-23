import React, { useState } from "react";
import Text from "./Text";

interface TooltipProps {
    children: React.ReactNode;
    text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
    const [show, setShow] = useState(false);

    const handleHover = () => setShow(!show);
    return (
        <div
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            className="relative group">
            <div
                className={`z-50 absolute -top-8 left-1/2 bg-primary p-1 rounded-br-lg opacity-0 group-hover:opacity-100 rounded-t-lg transition-opacity delay-300`}>
                <Text secondary sm className="text-white">
                    {text}
                </Text>
            </div>
            {children}
        </div>
    );
};

export default Tooltip;
