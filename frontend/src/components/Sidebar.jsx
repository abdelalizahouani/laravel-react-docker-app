import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


export default function Sidebar({ sidebarOpen, setSidebarOpen }){
    const {hasPermission,logout} =useAuth()
    
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
                <NavLink to={'/dashboard'} onClick={handleNavigation}>Dashbord</NavLink>
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

                
            </nav>
            <button className={"layout-button"} onClick={logout}> Logout </button>
        </aside>
    </>
}