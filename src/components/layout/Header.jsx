import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [language, setLanguage] = useState(
        localStorage.getItem("language") ||
        i18n.language ||
        "nl"
    );

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const handleDarkModeToggle = () => {
        setDarkMode((current) => {
            const newValue = !current;

            localStorage.setItem("darkMode", String(newValue));

            document.documentElement.classList.toggle(
                "dark-mode",
                newValue
            );

            return newValue;
        });
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);

        localStorage.setItem("language", lang);
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="app-header">
            <div className="header-container">

                <NavLink
                    to="/"
                    className="brand-link"
                >
                    <div className="brand-container">
                        <img
                            src={logo}
                            alt="FY Finance Dashboard Logo"
                            className="logo"
                        />

                        <span className="brand-text">
                            <strong className="brand-fy">
                                FY
                            </strong>

                            <span>
                                Finance Dashboard
                            </span>
                        </span>
                    </div>
                </NavLink>

                <div className="header-user">

                    <button
                        type="button"
                        className="language-button"
                        onClick={() =>
                            handleLanguageChange(language === "nl" ? "en" : "nl")
                        }
                        aria-label={
                            language === "nl"
                                ? "Switch to English"
                                : "Schakel naar Nederlands"
                        }
                        title={
                            language === "nl"
                                ? "English"
                                : "Nederlands"
                        }
                    >
                        {language === "nl" ? "🇳🇱" : "🇬🇧"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDarkModeToggle}
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        title={
                            darkMode
                                ? "Light mode"
                                : "Dark mode"
                        }
                        style={{
                            width: "38px",
                            height: "38px",
                            flex: "0 0 38px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            background: "var(--surface-color)",
                            color: "var(--text-color)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        {darkMode ? (
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="4"
                                />

                                <path d="M12 2v2" />
                                <path d="M12 20v2" />
                                <path d="m4.93 4.93 1.41 1.41" />
                                <path d="m17.66 17.66 1.41 1.41" />
                                <path d="M2 12h2" />
                                <path d="M20 12h2" />
                                <path d="m6.34 17.66-1.41 1.41" />
                                <path d="m19.07 4.93-1.41 1.41" />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>

                    {user?.name && (
                        <span className="header-user-name">
                            {user.name}
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="header-logout"
                    >
                        {t("auth.logout")}
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Header;