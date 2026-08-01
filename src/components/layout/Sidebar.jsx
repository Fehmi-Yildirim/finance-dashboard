import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Sidebar.css";

function Sidebar() {
    const { t } = useTranslation();
    return (
        <aside className="sidebar">
            <nav>
                <ul className="sidebar-list">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}> {t("sidebar.dashboard")}</NavLink></li>
                    <li><NavLink to="/transactions" className={({ isActive }) => isActive ? "active" : ""}> {t("sidebar.transactions")}</NavLink></li>
                    <li><NavLink to="/budgets" className={({ isActive }) => isActive ? "active" : ""}>{t("sidebar.budgets")}</NavLink></li>
                    <li><NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>{t("sidebar.reports")}</NavLink></li>
                    <li><NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}> {t("sidebar.settings")}</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}> {t("sidebar.about")}</NavLink></li>

                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;