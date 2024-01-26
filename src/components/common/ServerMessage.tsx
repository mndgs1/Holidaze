import React from "react";
import classNames from "classnames";

import Text from "./Text";
interface ServerMessageProps {
    message: string;
    danger?: boolean;
    success?: boolean;
    className?: string;
}

const ServerMessage = ({
    message,
    danger,
    success,
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
            <Text>{message}</Text>
        </div>
    );
};

export default ServerMessage;
