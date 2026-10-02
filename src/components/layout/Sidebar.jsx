import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
    const { t } = useTranslation();

    const handleNavigation = () => {
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                id="main-navigation"
                className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
            >
                <nav>
                    <ul className="sidebar-list">
                        <li>
                            <NavLink
                                to="/"
                                onClick={handleNavigation}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {t("sidebar.dashboard")}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/transactions"
                                onClick={handleNavigation}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {t("sidebar.transactions")}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/budgets"
                                onClick={handleNavigation}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {t("sidebar.budgets")}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/reports"
                                onClick={handleNavigation}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {t("sidebar.reports")}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/settings"
                                onClick={handleNavigation}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {t("sidebar.settings")}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/about"
                                onClick={handleNavigation}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {t("sidebar.about")}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;