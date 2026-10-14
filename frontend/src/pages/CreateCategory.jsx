import { useState } from "react"
import { api } from "../services/api"
export default function CreateCategory(){
    const [formData, setFormData]= useState({
        name:"",
        description: "",
    })
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const response = await api.post("/categories", formData)
            console.log("CATEGORY CREATED :", response.data)
            alert("Catégorie ajoutée avec succès !")
            setFormData({
                name:"",
                description: "",
            })
        }catch(error){
            console.error( "ERROR_CREATE_CATEGORY :",error.response?.data)
        }
    }
    return<>
        <div>
            <h1>Ajouter une categorie</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom de la categorie</label>
                    <input type="text" value={formData.name}
                        onChange={(e)=>setFormData({...formData, name :e.target.value})}
                        required 
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})}/>
                </div>
                <button type="submit">
                    Ajouter
                </button>
            </form>
        </div>
    </>
}