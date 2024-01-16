import { useRef, useEffect, useState } from "react";

const useOnScrollUp = () => {
    const [isScrollUpUsed, setIsScrollUpUsed] = useState(true);
    const prevScrollPos = useRef(0);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setIsScrollUpUsed(
            currentScrollPos <= 0 || currentScrollPos < prevScrollPos.current
        );
        prevScrollPos.current = currentScrollPos;
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isScrollUpUsed;
};

export default useOnScrollUp;
