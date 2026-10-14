import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
export default function AdminLayout() {
    const {user, hasRole, loading} = useAuth()
    if(loading){
        return <p>Loading...</p>
    }

    if(!user){
        return <Navigate to={'/login'} replace/>
    }
    if(!hasRole("admin")){
        return <Navigate to={'/dashboard'} replace/>
    }
    return <>
    <main>
        <Outlet/>
    </main>
    </>
}