import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDish, getCategories, updateDish } from "../services/api"

export default function EditDish(){
    const {id} = useParams()
    const [dish, setDish] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        category_id: "",
        name:"",
        description:"",
        price:"",
        image:null,
        is_available: true,
    })
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        getDish(id) 
        .then(response=>{
            const dish = response.data.dish
           // const foundDish = dishes.find(dish=>dish.id === Number(id))
           console.log("DISH RESPONSE :",response.data);
           setDish(dish)
           setFormData({
            category_id: dish.category_id,
            name: dish.name,
            description: dish.description || "",
            price: dish.price,
            image: null,
            is_available: dish.is_available === true ||
            dish.is_available == 1 || 
            dish.is_available === "1",
           })
        }).catch(error=>{
            console.error("ERROR_GET_DISH :",error.response?.data)
        }).finally(()=>{
            setLoading(false)
        })

        getCategories()
        .then(response=>{
            console.log("CATEGORIES RESPONSE :", response.data);
            setCategories(response.data.categories)
            
        }).catch(error=>{
            console.error(
                "ERROR_GET_CATEGORIES :",
                error.response?.data
            )
        })
            
    },[id])
    const handleSubmit = async (e)=> {
        e.preventDefault()
        try{
            const data = new FormData()
            data.append("category_id",formData.category_id)
            data.append("name",formData.name)
            data.append("description", formData.description)
            data.append("price", formData.price)
            data.append("is_available",formData.is_available ? 1:0)
            if(formData.image){
                data.append("image",formData.image)
            }
            const response = await updateDish(id, data)
            console.log("DISH UPDATED :", response.data)

            alert("Plat modifié avec succès")
        }catch(error){
            console.error("ERROR_UPDATE_DISH :",error.response?.data)
        }
        console.log("FORM DATA :", formData);
    }
    if(loading){
        return <p>Chargemet...</p>
    }
    if(!dish){
        return <p>Plat introuvable...</p>
    }
    return<>
        
        <h1>Modifier le plat</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Catégories</label>
                <select value={formData.category_id}
                    onChange={(e)=>setFormData({...formData, category_id: e.target.value})}
                    >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((category)=>(
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Nom du plat</label>
                <input type="text" value={formData.name}
                onChange={(e)=>setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div>
                <label>Description</label>
                <textarea value={formData.description} 
                    onChange={(e)=>setFormData({...formData, description: e.target.value})}
                />
            </div>
            <div>
                <input type="number" value={formData.price}
                onChange={(e)=>setFormData({...formData, price:e.target.value})}/>
                <span> DH</span>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={formData.is_available}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                is_available: e.target.checked
                            })
                        }
                    />

                    Plat disponible
                </label>
            </div>
            <div>
                <label>Image du plat</label>
                <input type="file" accept="image/*" onChange={(e)=>setFormData({...formData, image: e.target.files[0]})}/>
            </div>
            {dish.image && (
                <div>
                    <p>Image Actuelle</p>
                    <img src={`http://localhost:8000/storage/${dish.image}`} alt={dish.name} width="200"/>
                </div>
            )}

            <button type="submit">
                Modifier le plat
            </button>

        </form>

    </>
}