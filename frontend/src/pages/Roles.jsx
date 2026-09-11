import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Roles(){
    const [roles, setRoles] = useState([])
    const [permissions, setPermissions] = useState([])
    const [selectedRole, setSelectedRole] =useState(null)
    const [selectedPermissions, setSelectedPermissions] = useState([])
    const navigate = useNavigate()
    const { hasPermission } = useAuth()
    useEffect(()=>{
        const getRoles = async () =>{
            try{
                const response = await api.get('/roles')
                
                setRoles(response.data.roles)
            }catch(error){
                console.error('ERROR :',error)
            }
        }
        
        const getPermissions = async()=>{
            try{
                const response = await api.get("/permissions")
                
                setPermissions(response.data.permissions)
            }catch(error){
                console.log("ERROR:",error)
            }
        }
        getRoles()
        getPermissions()
    },[])
    //useEffect(()=>{
        //console.log('ROLES :',roles)
        //console.log("PERMISSION :",permissions)
    //},[roles,permissions])
    useEffect(() => {
        console.log("SELECTED ROLE :", selectedRole);
    }, [selectedRole]);
    useEffect(()=>{
        if(!selectedRole){
            return;
        }
        const getRolePermissions = async ()=>{
            try{
                const response = await api.get(`/roles/${selectedRole.id}`)
                setSelectedPermissions(response.data.permissions)
            }catch(error){
                console.error(error)
            }
        }
        getRolePermissions()
    },[selectedRole])

    useEffect(() => {
        console.log("SELECTED PERMISSIONS :", selectedPermissions);
    }, [selectedPermissions]);

    const savePermissions = async ()=>{
        try{
            const permissionIds = permissions.filter((permission)=>selectedPermissions.includes(permission.name))
            .map((permission)=>permission.id);
            const response = await api.put(`/roles/${selectedRole.id}/permissions`,{
                permissions :permissionIds
            });
            console.log("SAVE :",response.data)
        }catch(error){
            console.error(error)
        }
    }
    
        const deleteRole = async (id) =>{
            try{
                const response = await api.delete(`/roles/${id}`)
                console.log("DELETE ROLE :", response.data);
                setRoles(roles.filter((role)=>role.id !== id))
            }catch(error){
                console.log(error)
            }
        }
        
    

    return<>
        <h1>Roles</h1>
        {hasPermission("roles.create") && (
            <button onClick={()=>navigate('/roles/create')}>
                Create Role
            </button>
        )}
        
        {roles.map((role)=>(
            <div key={role.id}>
                
                <h3>{role.name}</h3>

                {hasPermission("roles.update") && (
                    <button onClick={() => navigate(`/roles/${role.id}/edit`)}>
                        Edit
                    </button>
                )}

                {hasPermission("roles.delete") && (
                    <button onClick={() => deleteRole(role.id)}>
                        Delete
                    </button>
                )}
                {hasPermission("roles.permissions") && (
                    <button onClick={() => setSelectedRole(role)}>
                        Edit Permissions
                    </button>
                )}
            </div>
        ))}
        {selectedRole && (
            <div>
                <h2>Permissions :{selectedRole.name}</h2>
                {permissions.map((permission)=>(
                    <div key={permission.id}>
                        <label>
                            <input type="checkbox" 
                            checked={selectedPermissions.includes(permission.name)}
                            onChange={()=>{
                                if(selectedPermissions.includes(permission.name)){
                                    setSelectedPermissions(selectedPermissions.filter((name)=>name!==permission.name))
                                }else{
                                    setSelectedPermissions([...selectedPermissions,permission.name]);
                                }
                            }} 
                            />
                            {permission.name}
                        </label>
                    </div>
                ))}
                <button onClick={savePermissions}>
                    Save Permissions
                </button>
            </div>

        )}
    </>
}