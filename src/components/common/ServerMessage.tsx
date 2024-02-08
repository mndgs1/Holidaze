import React from "react";
import classNames from "classnames";

import Text from "./Text";
interface ServerMessageProps {
    danger?: boolean;
    success?: boolean;
    className?: string;
    children: React.ReactNode;
}

const ServerMessage = ({
    danger,
    success,
    children,
    ...rest
}: ServerMessageProps) => {
    const classes = classNames(
        "p-2 rounded",
        {
            "text-danger-600 bg-danger-50": danger,
            "text-success-600 bg-success-50": success,
        },
        rest.className
    );

    return (
        <div className={classes}>
            <Text>{children}</Text>
        </div>
    );
};

export default ServerMessage;
