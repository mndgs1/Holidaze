import { RouteProps, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../stores/useUserStore";
import { useEffect } from "react";

function AuthWrapper({ children }: RouteProps) {
    const navigate = useNavigate();

    const { isLoggedIn } = useUser();

    const { pathname } = useLocation();

    const isProtectedRoute = pathname.includes("/holidaze/");

    useEffect(() => {
        const routesToRedirect = ["/login", "/register", "/"];
        if (isProtectedRoute && !isLoggedIn) {
            navigate("/login");
        }

        if (
            isLoggedIn &&
            routesToRedirect.some((route) => route === pathname)
        ) {
            navigate("/holidaze/properties");
        }
    }, [isLoggedIn, isProtectedRoute, navigate, pathname]);

    return <>{children}</>;
}

export default AuthWrapper;
