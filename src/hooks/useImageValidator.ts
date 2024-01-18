import { useState, useEffect } from "react";

const useImageValidator = (url: string) => {
    const [isValid, setValid] = useState(false);

    useEffect(() => {
        const img = new Image();

        img.onload = function () {
            // Image loaded successfully, so it's valid
            setValid(true);
        };

        img.onerror = function () {
            // Image failed to load, so it's not valid
            setValid(false);
        };

        img.src = url;

        // Cleanup function
        return () => {
            // Clear the onload and onerror handlers when the component unmounts
            img.onload = null;
            img.onerror = null;
        };
    }, [url]);

    return isValid;
};

export default useImageValidator;
