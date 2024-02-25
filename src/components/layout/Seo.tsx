import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/captializeFirstLetters";

interface SeoProps {
    title?: string;
}

const Seo = ({ title }: SeoProps) => {
    const { pathname } = useLocation();
    let pageTitle = "";

    if (
        pathname.includes("/login") ||
        pathname.includes("/register") ||
        pathname.includes("/about")
    ) {
        pageTitle = capitalizeFirstLetter(pathname.replace("/", ""));
    }

    if (pathname.includes("/holidaze/")) {
        pageTitle = capitalizeFirstLetter(pathname.replace("/holidaze/", ""));
    }

    if (pathname === "/") {
        pageTitle = "Home";
    }

    if (pathname.includes("/search")) {
        const searchTerm = pathname.split("/").pop();
        pageTitle = `Search: ${searchTerm}`;
    }

    if (title) {
        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title} | Holidaze</title>
            </Helmet>
        );
    }

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{pageTitle} | Holidaze</title>
        </Helmet>
    );
};

export default Seo;
