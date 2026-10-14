import { useContext, useState } from "react"
//import { api } from "../services/api"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import { ADMIN_DASHBOARD_ROUTE, DASHBOARD_ROUTE } from "../routes/routes"

export default function Login(){
    const {login} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        //const data = {
            //email :email,
            //password :password
        //}
        //console.log('DATA :',data)
    
        try{
            const authData = await login(email, password)
            ///const response = await api.post('/login',data)
            //console.log('SUCCESS :',response.data)
            //localStorage.setItem('token',response.data.token)
            console.log("AUTH DATA AFTER LOGIN :", authData)
            console.log("ROLES AFTER LOGIN :", authData.roles)
            console.log("ADMIN ROUTE :", ADMIN_DASHBOARD_ROUTE)
            console.log("IS ADMIN :", authData.roles.includes("admin"))
            if(authData.roles.includes("admin")){
                navigate(ADMIN_DASHBOARD_ROUTE)
            }else{
                navigate(DASHBOARD_ROUTE)
            }
            //navigate('/dashboard')
        }catch(error){
            console.log('ERROR :',error.response?.data)
        }
    }    
    return<>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit">Login</button>
        </form>
    </>
}
