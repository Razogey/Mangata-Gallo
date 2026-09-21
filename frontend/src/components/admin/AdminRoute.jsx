import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function AdminRoute() {
    const { user, loading } = useAuth();
    console.log("AdminRoute user:", user);
    const location = useLocation();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (user.role !== "admin" && user.role !== "staff") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}