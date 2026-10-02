import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="layout">
            <Header
                sidebarOpen={sidebarOpen}
                onMenuToggle={toggleSidebar}
            />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />

            <main onClick={closeSidebar}>
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;