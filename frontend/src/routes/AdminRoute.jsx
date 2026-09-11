import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export default function AdminRoute(){
    const {user, loading, hasRole, roles} = useAuth();
    console.log("ADMIN ROUTE :", {
        user,
        roles,
        loading
    });
    if(loading){
        <p>Loading ...</p>
    }
    if(roles !== "admin"){
        return <Navigate to="/dashboard" replace />;
    }
    if(!user){
        return <Navigate to="/login" replace/>
    }
    
    return <Outlet/>
}