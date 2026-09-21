export default function AdminRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    console.log("AdminRoute:", {
        user,
        role: user?.role,
        loading,
        pathname: location.pathname,
    });

    if (loading) {
        console.log("REDIRECT REASON: loading");
        return <p>Loading...</p>;
    }

    if (!user) {
        console.log("REDIRECT REASON: no user");
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (user.role !== "admin" && user.role !== "staff") {
        console.log("REDIRECT REASON: invalid role", user.role);
        return <Navigate to="/" replace />;
    }

    console.log("ADMIN ACCESS GRANTED");

    return <Outlet />;
}