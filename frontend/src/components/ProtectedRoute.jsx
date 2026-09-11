//import { useContext } from "react"

import { Navigate, Outlet } from "react-router-dom"
import {  useAuth } from "../context/AuthContext"

export default function ProtectedRoute(){
    const {user, loading} = useAuth()
    //const token = localStorage.getItem('token')
    //if(!token){
        //return <Navigate to='/login' replace/>
    //}
    if(loading){
        return <h2>Loading...</h2>
    }
    if(!user){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>
}