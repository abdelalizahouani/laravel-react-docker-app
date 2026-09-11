import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//

export default function GuestRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}