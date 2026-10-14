import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//

export default function GuestRoute() {
    const { user, loading, hasRole  } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (user) {
        if(hasRole("admin")){
            return <Navigate to="/admin/dashboard" replace /> 
        }
        return <Navigate to="/dashboard" replace />;
    }
           
    return <Outlet />;
}