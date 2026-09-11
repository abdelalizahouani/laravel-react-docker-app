import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

export default function CreatePermission() {

    const [name, setName] = useState("")
    const navigate = useNavigate()

    const createPermission = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/permissions", {
                name: name
            })

            console.log("CREATE PERMISSION :", response.data)

            setName("")
            navigate("/permissions")

        } catch (error) {
            console.log("STATUS :", error.response?.status)
            console.log("DATA :", error.response?.data)
            console.log("ERRORS :", error.response?.data?.errors)
        }
    }

    return (
        <>
            <h1>Create Permission</h1>

            <form onSubmit={createPermission}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter permission name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type="submit">
                    Create Permission
                </button>

            </form>
        </>
    )
}