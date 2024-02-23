import { RouteProps, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../stores/useUserStore";
import { useEffect } from "react";

function AuthWrapper({ children }: RouteProps) {
    const navigate = useNavigate();

    const { isLoggedIn } = useUser();

    console.log("!isLoggedIn" + !isLoggedIn);
    const { pathname } = useLocation();
    const isProtectedRoute = pathname.includes("/holidaze/");
    console.log("isProtectedRoute" + isProtectedRoute);

    useEffect(() => {
        if (isProtectedRoute && !isLoggedIn) {
            console.log("navigating to /login");
            navigate("/login");
        }

        if (
            (isLoggedIn && pathname === "/login") ||
            (isLoggedIn && pathname === "/register") ||
            (isLoggedIn && pathname === "/")
        ) {
            navigate("/holidaze/properties");
        }
    }, [isLoggedIn, isProtectedRoute, navigate, pathname]);

    return <>{children}</>;
}

export default AuthWrapper;
