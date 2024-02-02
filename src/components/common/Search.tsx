import React from "react";
import classNames from "classnames";

import Text from "./Text";
import Icon from "./Icon";

interface SearchProps {
    className?: string;
}

const Search = ({ className }: SearchProps) => {
    const classes = classNames("grow flex justify-center", className);
    return (
        <div className={classes}>
            <button className="drop-shadow-xl rounded-3xl flex items-center gap-2 py-2 px-4 shadow-md border border-secondary-200 w-full max-w-96">
                <Icon searchlite md />
                <div className="flex flex-col items-start">
                    <Text bold sm>
                        Anywhere
                    </Text>
                    <Text secondary sm>
                        Any time
                    </Text>
                </div>
            </button>
        </div>
    );
};

export default Search;
