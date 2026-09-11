import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../services/api"

export default function EditUser() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [roles, setRoles] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])

    useEffect(() => {

        const getUser = async () => {
            try {
                const response = await api.get(`/users/${id}`)

                console.log("USER :", response.data)

                setName(response.data.user.name)
                setEmail(response.data.user.email)
                setSelectedRoles(response.data.user.roles)

            } catch (error) {
                console.error("ERROR USER :", error)
            }
        }

        const getRoles = async () => {
            try {
                const response = await api.get("/roles")

                console.log("ROLES :", response.data)

                setRoles(response.data.roles)

            } catch (error) {
                console.error("ERROR ROLES :", error)
            }
        }

        getUser()
        getRoles()

    }, [id])


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


    const updateUser = async (e) => {

        e.preventDefault()

        try {

            const response = await api.put(`/users/${id}`, {
                name: name,
                email: email,
                password: password || undefined,
                roles: selectedRoles
            })

            console.log("UPDATE USER :", response.data)

            navigate("/users")

        } catch (error) {

            console.log("STATUS :", error.response?.status)
            console.log("DATA :", error.response?.data)
            console.log("ERRORS :", error.response?.data?.errors)

        }
    }


    return (
        <>
            <h1>Edit User</h1>

            <form onSubmit={updateUser}>

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
                        placeholder="Leave empty to keep current password"
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
                    Update User
                </button>

            </form>
        </>
    )
}