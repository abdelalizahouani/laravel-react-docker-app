import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function CreateRole(){
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const createRole = async(e) =>{
        e.preventDefault()
        
        try{
            const response = await api.post('/roles',{
            name:name
        })
            console.log("CREATE ROLE :", response.data);
            setName("")
            navigate('/roles')
        }catch(error){
            console.log("STATUS :",error.response.status)
            console.log("DATA :",error.response?.data)
            console.log("ERRORS :",error.response?.data.error)
            //console.error(error)
        }
    }

    return<>
    <div>
        <h1>Create Roles</h1>
        <form onSubmit={createRole}>
            
            <input placeholder="Enter role name" type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button type="submit">
                    Create Role
            </button>
        </form>
    </div>
    </>
}