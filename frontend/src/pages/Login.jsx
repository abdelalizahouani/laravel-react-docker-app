import { useContext, useState } from "react"
//import { api } from "../services/api"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"

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
            await login(email, password)
            ///const response = await api.post('/login',data)
            //console.log('SUCCESS :',response.data)
            //localStorage.setItem('token',response.data.token)
            navigate('/dashboard')
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
