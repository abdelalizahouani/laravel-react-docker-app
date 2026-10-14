import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrder } from "../services/api"
//import { getOrder } from "../services/api"

export default function OrderDetails() {

    const { id } = useParams()

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        console.log("ORDER ID :", id)
        getOrder(id)
            .then(response => {
                console.log("ORDER RESPONSE :", response.data)
                setOrder(response.data.order)
            })
            .catch(error => {
                console.error("ERROR_ORDER_DETAILS :", error)
                console.error("STATUS :", error.response?.status)
                console.error("DATA :", error.response?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <p>Chargement...</p>
    }
    if (!order) {
        return <p>Commande introuvable</p>
    }
    return (
        <>
            <button onClick={() => navigate(-1)}>
                ← Retour aux commandes
            </button>
            <h2>Détails de la commande #{order.id}</h2>

            <p>Total : {order.total} Dh</p>

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
            <p>
                Date : {new Date(order.created_at).toLocaleString("fr-FR")}
            </p>
            <h3>Articles :</h3>
            {order.items.map(item => (
                <div key={item.id}>
                    <p>
                        {item.dish.name}
                        {" × "}
                        {item.quantity}
                        {" — "}
                        {Number(item.price) * item.quantity} Dh
                    </p>
                </div>
            ))}
        </>
    )
}