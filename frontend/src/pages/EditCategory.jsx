import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../services/api"
export default function EditCategory(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        api.get(`/categories/${id}`)
        .then(response=>{
            const category = response.data.category ?? response.data
            setFormData({
                name: category.name ?? "",
                description: category.description ?? ""
            })
        }) 
        .catch(error=>{
            console.error( "ERROR_GET_CATEGORY :",error.response?.data)
        }) 
        .finally(() =>{
            setLoading(false)
        })
    },[id])
    const handleSubmit  = async(e)=>{
        e.preventDefault()
        try{
            const response = await api.put(`/categories/${id}`,formData)
            console.log("CATEGORY UPDATED :", response.data)
            alert("Catégorie modifiée avec succès !")
            navigate("/admin/categories")
        }
        catch(error){
            console.error(
                "ERROR_UPDATE_CATEGORY :",
                error.response?.data
            )
        }
    }
    if (loading) {
        return <p>Chargement de la catégorie...</p>
    }
    return(
    <div>
        <h1>Modifier une catégorie</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom de la catégorie</label>
                <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                        ...formData,
                        name: e.target.value,
                    })
                }
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />
            </div>
            <button type="submit">Enregistrer</button>
        </form>
    </div>
    )
}