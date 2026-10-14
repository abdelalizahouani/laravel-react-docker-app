import { useEffect, useState } from "react"
import { createDish, getCategories } from "../services/api"

export default function CreateDishes(){
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        description: "",
        price: "",
        image: "",
        is_available: true,

    })
    const [loading, setLoading] = useState(false)
    const [categoriesLoading, setCategoriesLoading] = useState(true)
    const [imagePreview,setImagePreview] = useState(null)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            //const response = await createDish(formData)
            const data = new FormData()
            data.append("category_id", formData.category_id)
            data.append("name", formData.name)
            data.append("description", formData.description)
            data.append("price", formData.price)
            data.append(
                "is_available",
                formData.is_available ? "1" : "0"
            )
            if (formData.image) {
                data.append("image", formData.image)
                console.log("IMAGE FILE :", formData.image)
            }
            console.log("IMAGE :", formData.image)
            console.log("IMAGE TYPE :", formData.image?.type)
            console.log("IMAGE SIZE :", formData.image?.size)
            
            const response = await createDish(data)
            console.log("DISH CREATED :",response.data)
            console.log("IMAGE URL :", response.data.image_url)
            alert('plat Ajouté avec succès')
            setImagePreview(null)
            setFormData({
                category_id:"",
                name:"",
                description:"",
                price:"",
                image:"",
                is_available: true,
            })
        }catch(error){
            console.error("ERROR_CREATE_DISH :",error.response?.data)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getCategories()
        .then(response=>{
            console.log("CATEGORIES RESPONSE :", response.data)
            setCategories(response.data.categories)
        })
        .catch(error=>{
            console.log(
                "ERROR_GET_CATEGORIES :",
                error.response?.data
            )
        }).finally(() => {
            setCategoriesLoading(false)
        })
    },[])

    return<>
        <h1>Ajouter un plat</h1>
        <form onSubmit={handleSubmit}>
            
            <div>
                <label>Nom du plat</label>
                <input type="text"
                    value={formData.name}
                    onChange={(e)=>setFormData({...formData,
                    name:e.target.value})}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea 
                    value={formData.description}
                    onChange={(e)=>setFormData({...formData,
                    description: e.target.value})}
                />
            </div>
            <div>
                <label>Price</label>
                <input type="number" min="0" step="0.01" value={formData.price}
                onChange={(e)=>setFormData({...formData, price: e.target.value})}/>
            </div>
            <div>
                <label>Gatégorie</label>
                <select value={formData.category_id}
                    onChange={(e)=>setFormData({...formData,
                    category_id: e.target.value
                    })}>
                    <option value="">
                        choisir une catégorie
                    </option>
                    {categories.map((category)=>(
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Image</label>
                <input type="file"
                    accept="image/*"
                    onChange={(e) =>{
                        const file = e.target.files[0]
                        setFormData({
                            ...formData,
                            image: file
                        })
                        if(file){
                            setImagePreview(URL.createObjectURL(file))
                        }
                    }}
                    placeholder="URL de l'image"
                    

                />
                {imagePreview &&(
                    <img src={imagePreview}
                        alt="Preview"
                        width="200"
                    />
                )}
            </div>
            <div>
                <label>
                    <input type="checkbox"
                    checked={formData.is_available}
                    onChange={(e)=>setFormData({...formData, is_available: e.target.checked})}
                    />
                    Disponible
                </label>
            </div>
            <button type="submit" disabled={loading}>
                { loading ? "Ajout en cours...":"Ajouter le plat" }
            </button>
        </form>
    </>
}