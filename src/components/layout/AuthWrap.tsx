import { RouteProps, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../stores/useUserStore";
import { useEffect } from "react";

function AuthWrapper({ children }: RouteProps) {
    const navigate = useNavigate();

    const { isLoggedIn } = useUser();

    const { pathname } = useLocation();
    const isProtectedRoute = pathname.includes("/holidaze/");

    useEffect(() => {
        if (isProtectedRoute && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, isProtectedRoute, navigate]);

    return <>{children}</>;
}

export default AuthWrapper;
