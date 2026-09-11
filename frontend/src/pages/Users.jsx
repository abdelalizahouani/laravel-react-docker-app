import { useEffect, useState } from "react"
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Users(){
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const { hasPermission } = useAuth()
    useEffect(()=>{
        const getUsers = async ()=>{
            try{
                const response = await api.get("/users")
                console.log('DATA_USERS',response.data.users)
                setUsers(response.data.users)
            }catch(error){
                console.error(error)
            }
        }
        getUsers()
    },[]);
    
    const deleteUser  =async (id)=>{
        try{
            const response = await api.delete(`/users/${id}`)
            console.log("DELETE USER :", response.data)
            setUsers(users.filter((user)=>user.id !==id))
        }catch(error){
            console.error("ERROR DELETE :", error)
        }
    }
    return <>
        <h1>Users :</h1>
        {hasPermission("users.create")&&(
            <button onClick={() => navigate("/users/create")}>
                Create User
            </button>
        )}
            {users.map((user)=>(
                <div key={user.id}>
                    <p>ID :{user.id}</p>,
                    <p>Name : {user.name}</p>,
                    <p>Email: {user.email}</p>,
                
                    <p>Roles :{user.roles && user.roles.length>0 ?
                        user.roles.map((role)=>(
                            <span key={role}>
                            {role}{" "}
                        </span>
                        ))
                    :"No Role"}</p>,
                    <p>Permission :</p>,
                    {user.permissions.length >0 ?(
                        user.permissions.map((permission)=>(
                            <span key={permission}>
                            {permission}{" "}
                            </span>
                        ))
                    ):(
                        <span>NO permissions</span>
                    )}
                    <hr />
                    {hasPermission("users.update") &&(
                        <button onClick={() => navigate(`/users/${user.id}/edit`)}>
                            Edit
                        </button>
                    )}
                    
                    {hasPermission("users.delete") && (
                        <button onClick={() => deleteUser(user.id)}>
                            Delete
                        </button>
                    )}
                </div>
            ))}
        
    </>
}