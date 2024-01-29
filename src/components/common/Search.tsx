import React from "react";

import Text from "./Text";
import Icon from "./Icon";
const Search = () => {
    return (
        <div className="">
            <button className="drop-shadow-xl rounded-3xl flex items-center gap-2 py-2 px-4 shadow-md border border-secondary-200">
                <Icon searchlite md />
                <div className="flex flex-col items-start">
                    <Text bold sm>
                        Anywhere
                    </Text>
                    <Text secondary sm>
                        Any time, add guests
                    </Text>
                </div>
            </button>
        </div>
    );
};

export default Search;
