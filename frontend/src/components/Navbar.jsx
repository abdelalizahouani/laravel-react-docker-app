import { useAuth } from "../context/AuthContext"

export default function Navbar({ setSidebarOpen }){
    const {user} = useAuth()
    return<>
    <nav className="navbar">
        <button
            className="menu-button"
            onClick={() => setSidebarOpen(prev => !prev)}
            >
            ☰
        </button>
        <h2>My App</h2>
        <div className="navbar-user">
            {user && (
                <span>
                    welcome, {user.name}
                </span>
            )}
        </div>
        
    </nav>
    </>
}