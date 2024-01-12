import React from "react";
import className from "classnames";

import Text from "../common/Text";

interface ServerMessageProps {
    children: React.ReactNode;
    className?: string;
}

const ServerMessage = ({ children, ...rest }: ServerMessageProps) => {
    const classes = className(
        "mt-4 px-2 py-2 bg-danger-50 rounded-lg",
        {},
        rest.className
    );

    return (
        <div className={classes} {...rest}>
            <Text primary className="text-danger-800">
                {children}
            </Text>
        </div>
    );
};

export default ServerMessage;
