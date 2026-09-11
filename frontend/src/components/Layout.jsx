import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout(){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return <>
    <div className="layout">
        <Navbar setSidebarOpen={setSidebarOpen}/>
        <div className="layout-body">

            <Sidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}

            />
            {sidebarOpen && ( <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} /> )}
            <main className="content">
                <Outlet/>
            </main>
        </div>
    </div>
    </>
}