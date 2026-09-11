import { useState } from "react"
import { api } from "../services/api"
//import api from '../services/api'
export default function Register(){
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit =async (e)=>{
        e.preventDefault()
        console.log('Form submitted')

        const data = {
            name :name,
            email :email,
            password: password,
            password_confirmation: passwordConfirmation
        }
        console.log('DATA', data)
        try{
            console.log('sending request...')
            const response = await api.post('/register', data)
            console.log('Response received !')
            console.log('Success:',response.data)
            localStorage.setItem('token',response.data.token)
            
        }catch(error){
            console.log('Error', error)
            console.log('Status', error.response?.status)
            console.log('ERROR_Data:', error.response?.data)
        }
    }
    return<>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={passwordConfirmation}
                    autoComplete="new-password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </>
}