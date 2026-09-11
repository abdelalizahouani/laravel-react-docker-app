import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PermissionRoute({permission}){
    const {user, loading, hasPermission} = useAuth()

    if(loading){
        return <h2>loading...</h2>
    }

    if(!user){
        return <Navigate to={'/login'} replace/>
    }

    if(!hasPermission(permission)){
        return <Navigate to={'/dashboard'} replace/>
    }
    return <Outlet/>
}