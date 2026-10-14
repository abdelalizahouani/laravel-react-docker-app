import { useEffect, useState } from "react"
import { api, getCategories } from "../services/api"
import { useNavigate } from "react-router-dom"
export default function AdminCategories() {
    const [categories, setCategories]=useState([]) 
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    //fun suppression
    const handleDelete = async (id)=>{
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer cette catégorie ?"
        )
        if(!confirmed) return
        try{
            await api.delete(`/categories/${id}`)
            setCategories(categories.filter(category=>category.id !== id))
            alert("categorie supprimé avec succès!")
        }catch(error){
            console.error( "ERROR_DELETE_CATEGORY :",error.message)
        }
    }
    useEffect(()=>{
        getCategories()
        .then(response=>{
            console.log("CATEGORIES RESPONSE :", response.data)
            setCategories(response.data.categories)
        })
        .catch(error=>{
            console.error(
                "ERROR_GET_CATEGORIES :",
                error.response?.data
            )
        })
        .finally(() => {
            setLoading(false)
        })
    },[])
    if (loading) {
        return <p>Chargement des catégories...</p>
    }
    return <>
        <div>
            <h1>Gestion des catégories</h1>
            <button onClick={()=>navigate("/admin/categories/create")}>
                Ajouter une catégorie
            </button>
            {categories.map(category =>(
                <div key={category.id}>
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                    <button onClick={(e)=>navigate(`/admin/categories/${category.id}/edit`)}>
                        Modifier
                    </button>
                    <button
                        onClick={() => handleDelete(category.id)}
                        >
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    </>
}