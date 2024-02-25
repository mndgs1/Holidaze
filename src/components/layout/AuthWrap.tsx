import { RouteProps, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../stores/useUserStore";
import { useEffect } from "react";

function AuthWrapper({ children }: RouteProps) {
    const navigate = useNavigate();

    const { isLoggedIn } = useUser();

    const { pathname } = useLocation();

    const protectedRoutes = [
        "/holidaze/properties",
        "/holidaze/bookings",
        "/holidaze/myProperties",
        "/holidaze/profile",
    ];
    const isProtectedRoute = pathname.includes(protectedRoutes.join("|"));

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
