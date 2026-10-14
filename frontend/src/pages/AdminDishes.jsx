import { useEffect, useState } from "react"
import { getDishes,deleteDish } from "../services/api"
import { useNavigate } from "react-router-dom"
export default function AdminDishes(){
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>{
        getDishes()
        .then(response=>{
            setDishes(response.data.dishes)
        }).catch(error=>{
            console.error("ERROR_GET_DISHES :",error.response?.data)
        }).finally(()=>{
            setLoading(false)
        })
                
    },[])
    const handleDelete = async (id)=>{
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer ce plat ?"
        )
        if(!confirmed){
            return
        }
        try{
            await deleteDish(id)
            setDishes(dishes.filter(dish=>dish.id !== id))
            alert("Plat supprimé avec succès")
        }catch(error){
            console.error("ERROR_DELETE_DISH :",error.response?.data);
        }
        
    }
    if (loading) {
        return <p>Chargement des plats...</p>
    }
    return<>
    <div>
        <h1>Gestion des plats</h1>
        {dishes.map((dish)=>(
            <div key={dish.id}>
                {dish.image && (
                    <img src={`http://localhost:8000/storage/${dish.image}`}
                        alt={dish.name}
                        width="150"
                    />
                )}
                <h3>{dish.id}</h3>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <p>{dish.price} DH</p>
                <button
                    onClick={() => navigate(`/admin/dishes/${dish.id}/edit`)}
                    >
                    Modifier
                </button>
                <button
                    onClick={() => handleDelete(dish.id)}
                    >
                    Supprimer
                </button>
                
            </div>
            
        ))}
        
    </div>
    </>
}