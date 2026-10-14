import { useEffect, useState } from "react"
import { api, getOrders } from "../services/api"
import { useAuth } from "../context/AuthContext"
export default function AdminOrders(){
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    
    const [updatingOrderId, setUpdatingOrderId] = useState(null)
    const [deletingOrderId, setDeletingOrderId] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const { hasPermission } = useAuth()

    

    const filteredOrders = [...(selectedStatus === "all"
        ?orders
        :orders.filter(order=>order.status === selectedStatus)
    )].filter(order=>
        order.id.toString().includes(searchTerm.toLowerCase()) || 
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort(
        (a,b)=> new Date(b.created_at) - new Date(a.created_at)
    )

    const getStatusCount = (status) => {
        return orders.filter(order => order.status === status).length   
    }
    const getItemsCount = (order)=>{
        return order.items.reduce((total, item)=>total+item.quantity,0)
    } 
    const handleStatusChange = async(orderId, status)=>{
        setUpdatingOrderId(orderId)
        setSuccessMessage("")
        
        try{
            const response =await api.put(`/orders/${orderId}`,{
                status: status
            })
            console.log("ORDER UPDATED :", response.data)
            //alert("Statut de la commande mis à jour")
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ?{...order, status:status}
                :order
                )
            )
            setSuccessMessage("Statut de la commande mis à jour")

            setTimeout(()=>{
                setSuccessMessage("")
            },3000)
        }catch(error){
            console.error("ERROR_UPDATE_ORDER :", error.response?.data)
        }finally{
            setUpdatingOrderId(null)
        }
    }
    const handleDeleteOrder = async(orderId)=>{
        const confirmed = window.confirm(
            `واش متأكد بغيتي تحذف Commande #${orderId} ؟`
        )
        if(!confirmed){
            return
        }
        try{
            setDeletingOrderId(orderId)
            setSuccessMessage("")
            await api.delete(`/orders/${orderId}`)
            setOrders(prevOrders=> prevOrders.filter(order=>order.id !== orderId))
            ///alert("Commande supprimée avec succès")
            setSuccessMessage("Commande supprimée avec succès")
            console.log("ORDER DELETED :", orderId)
            setTimeout(() => {
                setSuccessMessage("")
            }, 3000)
        }catch(error){
            console.error("ERROR_DELETE_ORDER :",error.response?.data)
        }finally{
            setDeletingOrderId(null)
        }
    }

    
    useEffect(()=>{
        getOrders()
        .then(response=>{
            console.log("ADMIN ORDERS RESPONSE :", response.data)
            setOrders(response.data.orders)
           
        }).catch(error=>{
            console.error("ERROR_ADMIN_ORDERS :", error)
        }).finally(()=>{
            setLoading(false)
        })
        
    },[])
    if(loading){
        return <p>Chargement des commandes...</p>
    }
    return<>
        <h1>Toutes les commandes</h1>
        {successMessage &&(
            <p className="success-message">
                {successMessage}
            </p>
        )}
        <div className="admin-order-filters">
            <input
                className="admin-order-search"
                type="text"
                placeholder="Rechercher une commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button onClick={() => setSearchTerm("")}
                    className="admin-order-search-clear"
                    >
                    Effacer
                </button>
            )}
            <button onClick={() => setSelectedStatus("all")}

                className={selectedStatus === "all" ? "active" : ""}
                >
                Toutes ({orders.length})
            </button>

            <button onClick={() => setSelectedStatus("pending")}
                className={selectedStatus === "pending" ? "active" : ""}
                >
                En attente ({getStatusCount("pending")})
            </button>

            <button onClick={() => setSelectedStatus("confirmed")}
                className={selectedStatus === "confirmed" ? "active" : ""}
                >
                Confirmée ({getStatusCount("confirmed")})
            </button>

            <button onClick={() => setSelectedStatus("preparing")}
                className={selectedStatus === "preparing" ? "active" : ""}
                >
                En préparation ({getStatusCount("preparing")})
            </button>

            <button onClick={() => setSelectedStatus("delivered")}
                className={selectedStatus === "delivered" ? "active" : ""}
                >
                Livrée ({getStatusCount("delivered")})
            </button>

            <button onClick={() => setSelectedStatus("cancelled")}
                className={selectedStatus === "cancelled" ? "active" : ""}
                >
                Annulée ({getStatusCount("cancelled")})
            </button>

        </div>

        {filteredOrders.length ===0?(
            <p>
                {searchTerm
                    ?"Aucune commande trouvée pour cette recherche"
                    :"Aucune commande avec ce statut"
                }
                
            </p>
            ):(
            filteredOrders.map((order)=>(
                
                <div className="admin-order-card" key={order.id}>
                    <p>{filteredOrders.length} commande(s) trouvée(s)</p>
                    <h3>
                        commande #{order.id}
                    </h3>
                    <p>Date: {new Date(order.created_at).toLocaleString("fr-FR")}</p>
                    <div className="admin-order-client">
                        <p>
                            <strong>Client :</strong>
                            {order.user.name}
                        </p>
                        <p>
                            <strong>Email : </strong>
                            {order.user.email}
                        </p>
                    </div>
                    <div className="order-actions">
                        {updatingOrderId === order.id && (
                            <span>Mise à jour...</span>
                        )}
                        {hasPermission("orders.update") && (
                            <>
                            <label>
                                Statut :
                            </label>
                        
                            <select disabled={updatingOrderId === order.id} className={`order-status status-${order.status}`} value={order.status} 
                                onChange={(e)=>{
                                    if (e.target.value === order.status) {
                                        return
                                    }
                                handleStatusChange(order.id, e.target.value)}}>
                                <option value="pending">En attente</option>
                                <option value="confirmed">Confirmée</option>
                                <option value="preparing">En préparation</option>
                                <option value="delivered">Livrée</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                            </>
                        )}    
                    </div>
                    
                    {hasPermission("orders.delete") && (
                        <button className="delete-order-button" onClick={() => handleDeleteOrder(order.id)} disabled={deletingOrderId === order.id}>
                            {deletingOrderId === order.id ? "Suppression..." : "Supprimer"}
                        </button>
                    )}
                    <p></p>
                    <h4>Articles : {getItemsCount(order)}</h4>
                    <div className="order-items">
                        {order.items.map(item=>(
                            <div className="order-item" key={item.id}>
                                <span>{item.dish?.name} × {item.quantity}</span>
                                <span>
                                    {Number(item.price) * item.quantity} Dh
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    <p className="order-total">
                        Total :{order.total} Dh
                    </p>
                    <hr />
                    
                </div>
                
                
            ))
            
        )}
        
    </>
}