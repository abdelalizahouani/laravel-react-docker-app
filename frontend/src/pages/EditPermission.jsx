import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../services/api"

export default function EditPermission() {

    const { id } = useParams()
    const [name, setName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        const getPermission = async () => {
            try {
                const response = await api.get(`/permissions/${id}`)

                console.log("PERMISSION :", response.data)

                setName(response.data.permission.name)

            } catch (error) {
                console.error(error)
            }
        }

        getPermission()

    }, [id])

    const updatePermission = async (e) => {
        e.preventDefault()

        try {
            const response = await api.put(`/permissions/${id}`, {
                name: name
            })

            console.log("UPDATE PERMISSION :", response.data)

            navigate("/permissions")

        } catch (error) {
            console.log("STATUS :", error.response?.status)
            console.log("DATA :", error.response?.data)
            console.log("ERRORS :", error.response?.data?.errors)
        }
    }

    return (
        <>
            <h1>Edit Permission</h1>

            <form onSubmit={updatePermission}>

                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type="submit">
                    Update Permission
                </button>

            </form>
        </>
    )
}