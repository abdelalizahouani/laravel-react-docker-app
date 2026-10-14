import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext()

export function AuthProvider({children}){
    //
    const [user, setUser] = useState(null)
    const [permissions, setPermissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [roles, setRoles] = useState([])

    const login = async (email, password)=>{

        const data = {
            email: email,
            password: password
        }
        const response = await api.post('/login',data)
        localStorage.setItem('token', response.data.token)
        //setUser(response.data.user)
        const authData = await checkAuth()
        return {
            ...response.data,
            ...authData
        }
    }

    const logout = async ()=>{
        try{
            await api.post('/logout')
            localStorage.removeItem('token')
            setUser(null)
            setPermissions([])
            setRoles(null)
        }catch(error){
            console.log('ERROR_Logout',error.response?.data)
        }
    }

    const checkAuth = async ()=>{
        const token = localStorage.getItem('token')
        if(!token){
            setLoading(false)
            return
        }
        try{
            console.log("CHECK AUTH START")
            const response = await api.get('/user') 
            console.log("CHECK AUTH RESPONSE :", response.data)
            setUser(response.data.user)
            setRoles(response.data.roles)
            setPermissions(response.data.permissions)
            
            console.log("USER AFTER SET :", response.data.user)
            console.log("ROLE AFTER SET :", response.data.role)
            return response.data
        }catch(error){
            console.log("CHECK AUTH ERROR :", error.response?.data)
            console.log("CHECK AUTH STATUS :", error.response?.status)
            localStorage.removeItem('token')
            setUser(null)
            setPermissions([])
        }finally{
            console.log("CHECK AUTH FINISHED")
            setLoading(false)
        }
    }
    useEffect(()=>{
        checkAuth()
    },[])
    const hasPermission = (permission)=>{
        return permissions.includes(permission)
    }
    const hasRole = (roleName)=>{
        return roles.includes(roleName) 
    }
    console.log("AUTH CONTEXT RENDER :",{user,
    roles,
    loading})
    return(
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, checkAuth, permissions, hasPermission, hasRole, roles }}>
            {children}
        </AuthContext.Provider>
    )

} 

export function useAuth(){
    return useContext(AuthContext)
}

