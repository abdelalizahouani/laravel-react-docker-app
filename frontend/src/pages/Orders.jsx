import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Orders(){
    const [orders, setOrders] = useState([])
    const {user, loading} = useAuth()
    const [ordersLoading, setOrdersLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        getMyOrders()
        .then(response=>setOrders(response.data.orders))
        .catch(error=>{
            console.error("ERROR_ORDERS :", error)
        }).finally(()=>{
            setOrdersLoading(false)
        })
    },[])

   if(loading){
    return <p>loading...</p>
   }
   if(ordersLoading){
    return <p>Chargement des commandes...</p>
   }
    return<>

        <h2> #{user.name}-Mes Commandes</h2>
        {orders.length  === 0?(
            <p>Aucune commades</p>
        ):(orders.map(order=>(
            <div key={order.id}>
                <h3>Commade #{order.id}</h3>
                <p>
                    Total : {order.total} Dh
                </p>

                <p>
                    Statut :{" "}
                    <strong className={`status-${order.status}`}>
                        {order.status === "pending" && "En attente"}
                        {order.status === "confirmed" && "Confirmée"}
                        {order.status === "preparing" && "En préparation"}
                        {order.status === "delivered" && "Livrée"}
                        {order.status === "cancelled" && "Annulée"}
                    </strong>
                </p>

                <h4>Articles :</h4>
                {order.items.map(item=>(
                    <div key={item.id}>
                        <p>
                            {item.dish.name}
                            {" * "}
                            {item.quantity}
                            {" - "}
                            {item.price} Dh
                        </p>
                    </div>
                ))}
                <button onClick={() => navigate(`/dashboard/orders/${order.id}`)}>
                    Voir détails
                </button>
                <hr/>
            </div>
        )))}
    </>
}