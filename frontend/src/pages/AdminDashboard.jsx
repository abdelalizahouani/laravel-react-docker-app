import { useEffect, useState } from "react"
import { getOrders } from "../services/api"
import { useNavigate } from "react-router-dom"
import { ADMIN_ORDERS_ROUTE } from "../routes/routes"
export default function AdminDashboard() {
    const [orders, setOrders]=useState([])
    const [ordersLoading, setOrdersLoading] = useState(true)
    const [selectedPeriod, setSelectedPeriod] = useState("all")
    const navigate = useNavigate()
    
    const filteredOrders = orders.filter(order=>{
        const orderDate = new Date(order.created_at)
        const now = new Date()
        //today
        if(selectedPeriod === "today"){
            return orderDate.toDateString() === now.toDateString()
        }
        if(selectedPeriod === "week"){
            const startOfWeek = new Date()
            const currentDay = startOfWeek.getDay()
            startOfWeek.setDate(startOfWeek.getDate() - currentDay)
            startOfWeek.setHours(0, 0, 0, 0)
            return orderDate >= startOfWeek
        }
        if(selectedPeriod === "month"){
            return (
                orderDate.getMonth() === now.getMonth() &&
                orderDate.getFullYear() === now.getFullYear()
            )
        }

        return true
    })
    const totalRevenue = filteredOrders
    .filter(order => order.status !== "cancelled")
    .reduce((total, order) => total + Number(order.total || 0), 0)

    const validOrders = filteredOrders.filter(order => order.status !== "cancelled")

    const averageOrderValue = validOrders.length > 0
        ? totalRevenue / validOrders.length
        : 0

    const totalFilteredOrders = filteredOrders.length

    const deliveredPercentage = totalFilteredOrders > 0
    ? (filteredOrders.filter(order => order.status === "delivered").length / totalFilteredOrders) * 100
    : 0    
    useEffect(()=>{
        const fetchOrders = async()=>{
            try{
                const response = await getOrders()
                console.log("ORDERS RESPONSE :", response.data)
                console.log("FIRST ORDER USER :", response.data.orders[0].user)
                setOrders(response.data.orders)
            }catch(error){
                console.log("ERROR_GET_ORDERS :", error.response?.data)
            }finally{
                setOrdersLoading(false)
            }
        }
        fetchOrders()  
    },[])
    if (ordersLoading) {
        return <p>Loading orders...</p>
    }
    return <>
        
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="period-filters">
                <button
                    className={selectedPeriod === "all" ? "active" : ""}
                    onClick={() => setSelectedPeriod("all")}
                >
                    Tout
                </button>

                <button
                    className={selectedPeriod === "today" ? "active" : ""}
                    onClick={() => setSelectedPeriod("today")}
                >
                    Aujourd'hui
                </button>

                <button
                    className={selectedPeriod === "week" ? "active" : ""}
                    onClick={() => setSelectedPeriod("week")}
                >
                    Cette semaine
                </button>

                <button
                    className={selectedPeriod === "month" ? "active" : ""}
                    onClick={() => setSelectedPeriod("month")}
                >
                    Ce mois
                </button>
            </div>

            <p className="selected-period">
                {selectedPeriod === "all" && "Statistiques : Toutes les commandes"}
                {selectedPeriod === "today" && "Statistiques : Aujourd'hui"}
                {selectedPeriod === "week" && "Statistiques : Cette semaine"}
                {selectedPeriod === "month" && "Statistiques : Ce mois"}
            </p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <p>{filteredOrders.length}</p>
                </div>
                <div className="dashboard-card">
                    <h3>Delivered Rate</h3>
                    <p>{deliveredPercentage.toFixed(1)}%</p>
                </div>
                <div className="dashboard-card">
                    <h3>Pending</h3>
                    <p>
                        {orders.filter(order => order.status === "pending").length}
                    </p>
                </div>
                <div className="dashboard-card">
                    <h3>Confirmed</h3>
                    <p>
                        {orders.filter(order => order.status === "confirmed").length}
                    </p>
                </div>
                <div className="dashboard-card">
                    <h3>Preparing</h3>
                    <p>
                        {orders.filter(order => order.status === "preparing").length}
                    </p>
                </div>
                <div className="dashboard-card">
                    <h3>Delivered</h3>
                    <p>
                        {orders.filter(order => order.status === "delivered").length}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Cancelled</h3>
                    <p>
                        {orders.filter(order => order.status === "cancelled").length}
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Revenue</h3>
                    <p>
                        {totalRevenue} DH
                    </p>
                </div>

                <div className="dashboard-card">
                    <h3>Average Order</h3>
                    <p>
                        {averageOrderValue.toFixed(2)} DH
                    </p>
                </div>
            </div>
            <div className="recent-orders">
                <h2>Recent Orders</h2>

                {
                    [...filteredOrders]
                    .sort((a,b)=>new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5).map(order => (
                    <div className="recent-order" key={order.id} onClick={() => navigate(`/admin/orders/${order.id}`)}>
                        <div>
                            <strong
                                onClick={() => window.location.href = `/admin/orders/${order.id}`}
                                style={{ cursor: "pointer" }}
                            >
                            Order #{order.id}
                            </strong>
                            <p>{order.user.name}</p>
                            <p>{order.user.email}</p>
                            <p  className={`status-${order.status}`}>
                                {order.status === "pending" && "En attente"}
                                {order.status === "confirmed" && "Confirmée"}
                                {order.status === "preparing" && "En préparation"}
                                {order.status === "delivered" && "Livrée"}
                                {order.status === "cancelled" && "Annulée"}
                            </p>
                        </div>
                
                        <strong>{order.total} DH</strong>
                    </div>
                ))}
                <button onClick={() => navigate(ADMIN_ORDERS_ROUTE)}>
                    View All Orders
                </button>
            </div>

        </div>
        
    </>
}