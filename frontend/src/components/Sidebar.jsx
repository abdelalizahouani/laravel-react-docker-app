import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ADMIN_DASHBOARD_ROUTE, ADMIN_ORDERS_ROUTE } from "../routes/routes"

export default function Sidebar({ sidebarOpen, setSidebarOpen }){
    const {hasPermission,logout, hasRole} =useAuth()
    
    const handleNavigation = () => { setSidebarOpen(false) }

    const linkStyle = ({isActive})=>({

        display: "block",
        padding: "10px",
        textDecoration: "none",
        fontWeight : isActive? "bold": "normal",


    })
    return<>
        <aside className={`sidebar ${sidebarOpen ? "open":""}`}>
            
            
            <nav className="sidebar-nav">
                
                
                {hasRole("admin") ?(
                    <NavLink
                    to={ADMIN_DASHBOARD_ROUTE}
                    onClick={handleNavigation}
                    style={linkStyle}
                    >Admin Dashboard
                    </NavLink>
                ):(
                    <NavLink
                    to='/dashboard'
                    onClick={handleNavigation}
                    style={linkStyle}
                    >Dashboard
                    </NavLink>
                )}
                <NavLink to={'/menu'} onClick={handleNavigation}>Menu</NavLink>
                {hasPermission("products.view") && (
                    <NavLink onClick={handleNavigation} to={"/products"} style={linkStyle}>
                        Products
                    </NavLink>
                )}

                {hasPermission("users.view") && (
                    <NavLink onClick={handleNavigation} to="/users" style={linkStyle}> Users </NavLink> 
                )}

                {hasPermission("roles.view") && ( 
                    <NavLink onClick={handleNavigation} to="/roles" style={linkStyle}> Roles 
                    </NavLink> 
                )}

                {hasPermission("permissions.view") && ( 
                    <NavLink onClick={handleNavigation} to="/permissions" style={linkStyle}> Permissions 
                    </NavLink> 
                )}

                {hasRole("admin") &&(
                    <NavLink
                        to={ADMIN_ORDERS_ROUTE}
                        style={linkStyle}
                        onClick={handleNavigation}
                    >
                        Orders
                    </NavLink>
                )}
                {!hasRole("admin") &&(
                    <NavLink
                        to={'/dashboard/orders'}
                        style={linkStyle}
                        onClick={handleNavigation}
                    >
                        Mes commandes
                    </NavLink>
                )}
            </nav>
            <button className={"layout-button"} onClick={logout}> Logout </button>
        </aside>
    </>
}