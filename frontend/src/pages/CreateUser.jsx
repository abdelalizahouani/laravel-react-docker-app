import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function CreateUser() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [roles, setRoles] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        const getRoles = async () => {
            try {
                const response = await api.get("/roles")

                console.log("ROLES :", response.data)

                setRoles(response.data.roles)

            } catch (error) {
                console.error("ERROR :", error)
            }
        }

        getRoles()

    }, [])

    const handleRoleChange = (roleId) => {

        if (selectedRoles.includes(roleId)) {

            setSelectedRoles(
                selectedRoles.filter((id) => id !== roleId)
            )

        } else {

            setSelectedRoles([
                ...selectedRoles,
                roleId
            ])

        }
    }

    const createUser = async (e) => {
        e.preventDefault()

        try {

            const response = await api.post("/users", {
                name: name,
                email: email,
                password: password,
                roles: selectedRoles
            })

            console.log("CREATE USER :", response.data)

            navigate("/users")

        } catch (error) {

            console.log("STATUS :", error.response?.status)
            console.log("DATA :", error.response?.data)
            console.log("ERRORS :", error.response?.data?.errors)

        }
    }

    return (
        <>
            <h1>Create User</h1>

            <form onSubmit={createUser}>

                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Roles</h3>

                    {roles.map((role) => (
                        <div key={role.id}>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedRoles.includes(role.id)}
                                    onChange={() => handleRoleChange(role.id)}
                                />

                                {role.name}
                            </label>

                        </div>
                    ))}
                </div>

                <button type="submit">
                    Create User
                </button>

            </form>
        </>
    )
}