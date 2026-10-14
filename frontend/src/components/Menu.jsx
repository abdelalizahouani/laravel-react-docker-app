import { useEffect, useState } from "react"
import { createOrder, getCategories, getDishes } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Menu(){
    const [categories, setCategories] = useState([])
    const [dishes, setDishes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [cart, setCart]=useState([])
    const [ordering, setOrdering] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        getCategories()
        .then(response=>setCategories(response.data.categories))
        .catch(error=>{
            console.error('Error_Categories :',error)
        });
        getDishes()
        .then(response=>{
            setDishes(response.data.dishes)
        }).catch(error=>{
            console.error('Error_Dishes:',error)
        })
    
    },[])
    const filteredDishes = selectedCategory ? dishes.filter(dish=>dish.category_id === selectedCategory):dishes

    const addToCart = (dish)=>{
        const existingItem = cart.find(item=>item.id === dish.id)
        if(existingItem){
            const updatedCart = cart.map(item=>
                item.id === dish.id
                    ?{...item, quantity:item.quantity+1}
                    :item
            )
            setCart(updatedCart)
            console.log("CART :",updatedCart)
            return
        }
        const newItem ={
            ...dish,
            quantity:1
        }
        const updatedCart =[...cart, newItem]
        setCart(updatedCart)
        console.log('CART :',updatedCart)
    }
    const CardTotal =cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    )
    const increaseQuantity = (dishId)=>{
        setCart(
            cart.map(item=>
                item.id === dishId
                ?{...item, quantity:item.quantity+1}
                :item
            )
        )
    }
    const decreaseQuantity =(dishId)=>{
        setCart(
            cart.map(item=>
                item.id === dishId
                ?{...item, quantity: item.quantity-1}
                :item
            ).filter(item=>item.quantity>0)
        )
    }
    const removeFromCart = (dishId)=>{
        setCart(
            cart.filter(item=>item.id !== dishId)
        )
    }
    const handleOrder = async ()=>{
        if (cart.length === 0) {
            alert("Le panier est vide")
            return
        }

        const unavailableItem = cart.find(item => !item.is_available)
        if (unavailableItem) {
            alert(`${unavailableItem.name} est actuellement indisponible`)
            return
        }

        const confirmed = window.confirm(
            `واش متأكد بغيتي تأكد commande ديالك ؟\nTotal : ${CardTotal} Dh`
        )

        if (!confirmed) {
            return
        }
        
        const orderData = {
            status: "pending",
            items: cart.map(item => ({
                dish_id: item.id,
                quantity: item.quantity
            }))
        }
        setOrdering(true)
        try{
            const response = await createOrder(orderData)
            console.log("ORDER CREATED :", response.data)
            const order = response.data.order

            alert(
                `Commande #${order.id} créée avec succès.\n` +
                `Total : ${order.total} Dh\n` +
                `Statut : ${order.status}`
            )
            setCart([])
            navigate('/dashboard/orders')
        }catch(error){
            console.error("ERROR_ORDER :", error.response?.data)
            const message = error.response?.data?.message

            alert(message || "Erreur lors de la création de la commande")
        }finally{
            setOrdering(false)
        }
        
    }
    return<>
    <h1>Menu :</h1>
    <button onClick={() => setSelectedCategory(null)} 
        className={selectedCategory === null ? "active" : ""}
        >
        Toutes
    </button>
    <h2>Categories :</h2>
    <p>Test :</p>
    <hr/>
        {categories.map((category)=>(
            <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id?"active":""}
                >
                {category.name}
            </button>
        ))}
    <h2>Dishes</h2>
        {filteredDishes.map(dish=>(
            <div key={dish.id}> 
                <p>{dish.name}</p>
                <p>{dish.description}</p>
                <p>{dish.price}</p>
                {dish.is_available ?(
                    <button onClick={()=>addToCart(dish)}>
                        Ajouter au panier
                    </button>
                ):(
                    <p>Indisponible</p>
                )}
                
            </div>
        ))}

        <h2>Panier</h2>
        <p>
            Total :{CardTotal} Dh
        </p>
        <button onClick={handleOrder} 
            disabled={ordering}
           
            >
            {ordering ?"Commade en cours ...":"Commander"}
        </button>
        {cart.map(item => (
            <div key={item.id}>
                <p>{item.name}</p>
                
                <button onClick={() => decreaseQuantity(item.id)}>
                    -
                </button>
                <span>{item.quantity} </span>
                <button onClick={() => increaseQuantity(item.id)}>
                    +
                </button>
                <p>Prix unitaire: {item.price} Dh</p>
                <p>
                    Sous-total : {Number(item.price) * item.quantity} Dh
                </p>
                <button onClick={() => removeFromCart(item.id)}>
                    Supprimer
                </button>
                
            </div>
            
        ))}
    </>
}