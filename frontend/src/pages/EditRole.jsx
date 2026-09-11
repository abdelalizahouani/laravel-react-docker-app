import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../services/api"

export default function EditRole(){
    const {id} = useParams()
    const [name, setName] =useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        const getRole = async()=>{
            try{
                const response =await api.get(`/roles/${id}`)
                setName(response.data.role.name)
                
            }catch(error){
                console.error(error)
            }
             
        }
        getRole()
    },[id])
    const updateRole = async (e) =>{
        e.preventDefault()
        try{
            const response = await api.put(`/roles/${id}`,{
                name :name
            })
            console.log("UPDATE ROLE :",response.data)
            navigate("/roles")
        }catch(error){
            console.log("STATUS :", error.response?.status);
            console.log("DATA :", error.response?.data);
            console.log("ERRORS :", error.response?.data?.errors);
        }
    }
    return<>
        <h1>Edit Roles</h1>
        <form onSubmit={updateRole}>
            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button type="submit">
                Update Role
            </button>
        </form>
    </> 
}