//import { useContext, useEffect, useState } from "react"
//import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import {  useAuth } from "../context/AuthContext"

export default function Dashboard(){
    const {user, logout, permissions, roles} = useAuth()
    //const [loading, setLoading] = useState(true)
    //const [permissions, setPermissios] =useState([]);
    console.log("USER :",user)
    const navigate = useNavigate()
    /*
    useEffect(()=>{
        const getUser = async () => {
            try{
                //console.log('TOKEN',localStorage.getItem('token'))
                const response = await api.get('/user')
                console.log('USER :',response.data.user)
                console.log("PERMISSION :",response.data.permissions);
                setPermissios(response.data.permissions)
                permissions.includes('products.create')
                //setUser(response.data)
                
            }catch(error){
                //console.log('FULL ERROR',error)
                //console.log('ERROR:', error.response?.data)
                //console.log('Data:', error.response?.data)
                //navigate('/login')
                console.error(error)
            }
            //finally{
                //setLoading(false)
            //}
        }
        getUser()
    },[])
*/
    //if(loading){
        //return <h1>loading...</h1>
    //}
    if(!user){
        return <h1>Loading ...</h1>
    }
    const handleLogout = async ()=>{
        await logout()
        navigate('/login')
        /***
        try{
            await api.post('/logout')
            localStorage.removeItem('token')
            navigate('/login')
        }catch(error){
            console.log('ERROR LOGOUT :',error.response?.data)
        }
        **/
    }
    
    return<>
    <h1>dashboard</h1>
    
        <div>
            <p>Id :{user?.id}</p>
            <h2>Welcome : {user?.name}</h2>
            <p>Email: {user?.email}</p>
            <p>Role :{roles.join(', ')}</p>
        </div>
        <h3>Permission :</h3>
        {permissions.map((p)=>(
            <div key={p}>
                {p}
            </div>
        ))}
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    </>
}