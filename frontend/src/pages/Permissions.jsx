import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Permission(){
    const [permissions, setPermissions] = useState([])
    const navigate = useNavigate()
    const {hasPermission} = useAuth()
    useEffect(()=>{
        const getPermissions= async ()=>{
            try{
                const response = await api.get("/permissions")
                setPermissions(response.data.permissions)
            }catch(error){
                console.error("ERROR :",error)
            }
        }
        getPermissions()
    },[])
    const deletePermission = async (id) => {
        try {
            const response = await api.delete(`/permissions/${id}`)

            console.log("DELETE PERMISSION :", response.data)

            setPermissions(
                permissions.filter((permission) => permission.id !== id)
            )

        } catch (error) {
            console.error("ERROR :", error)
        }
    }
    return<>
    <h1>Permissions</h1>

    {hasPermission("permissions.create") && (
        <button onClick={() => navigate("/permissions/create")}>
            Create Permission
        </button>
    )}

    {permissions.map((permission)=>(
        <div key={permission.id}>
           <p>ID: {permission.id} - {permission.name}</p> 

            {hasPermission("permissions.update") && (
                <button onClick={() => navigate(`/permissions/${permission.id}/edit`)}>
                    Edit
                </button>
            
            )}

            {hasPermission("permissions.delete") && (
                <button onClick={() => deletePermission(permission.id)}>
                    Delete
                </button>
            )}
            
        </div>
        
    ))}
    </>
}