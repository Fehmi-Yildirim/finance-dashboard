import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function MainLayout({ children }) {
    return (
        <div className="layout">
            <Header />
            <Sidebar />

            <main>
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;
