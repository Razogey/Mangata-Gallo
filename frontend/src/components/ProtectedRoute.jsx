import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        const redirectPath =
            location.pathname + location.search;

        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(
                    redirectPath
                )}`}
                replace
            />
        );
    }

    return <Outlet />;
}