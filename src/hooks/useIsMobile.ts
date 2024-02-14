import { useState, useEffect } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640); // Adjust the breakpoint as needed

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 640); // Adjust the breakpoint as needed
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;
