import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import logo from "../assets/logo.png";
import "./Login.css";
import { useTranslation } from "react-i18next";

function Login() {
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(
        localStorage.getItem("language") ||
        i18n.language ||
        "nl"
    );

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") !== "false"
    );

    const handleDarkModeToggle = () => {
        setDarkMode((current) => {
            const newValue = !current;

            localStorage.setItem(
                "darkMode",
                String(newValue)
            );

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

    return (
        <main className="login-page">
            <section className="login-panel">
                <div className="login-panel-language-selector">
                    <button
                        type="button"
                        className="language-button"
                        onClick={() =>
                            handleLanguageChange(
                                language === "nl"
                                    ? "en"
                                    : "nl"
                            )
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
                        {language === "nl"
                            ? "🇳🇱"
                            : "🇬🇧"}
                    </button>

                    <button
                        type="button"
                        className="dark-mode-button"
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
                </div>

                <div className="login-panel-content">
                    <LoginForm />
                </div>
            </section>

            <section className="login-info-panel">
                <div className="login-info-content">
                    <div className="login-info-brand">
                        <img
                            src={logo}
                            alt="FY Finance Dashboard Logo"
                            className="login-info-logo"
                        />

                        <span>
                            <strong>FY</strong>{" "}
                            Finance Dashboard
                        </span>
                    </div>

                    <div className="login-info-copy">
                        <span className="login-info-eyebrow">
                            {t("login.info.eyebrow")}
                        </span>

                        <h2>
                            {t("login.info.title")}
                        </h2>

                        <p>
                            {t(
                                "login.info.description"
                            )}
                        </p>
                    </div>

                    <div className="login-features">
                        <div className="login-feature">
                            <span
                                className="login-feature-icon"
                                aria-hidden="true"
                            >
                                ✓
                            </span>

                            <div>
                                <strong>
                                    {t(
                                        "login.info.features.overview.title"
                                    )}
                                </strong>

                                <span>
                                    {t(
                                        "login.info.features.overview.description"
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="login-feature">
                            <span
                                className="login-feature-icon"
                                aria-hidden="true"
                            >
                                ✓
                            </span>

                            <div>
                                <strong>
                                    {t(
                                        "login.info.features.budgets.title"
                                    )}
                                </strong>

                                <span>
                                    {t(
                                        "login.info.features.budgets.description"
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="login-feature">
                            <span
                                className="login-feature-icon"
                                aria-hidden="true"
                            >
                                ✓
                            </span>

                            <div>
                                <strong>
                                    {t(
                                        "login.info.features.transactions.title"
                                    )}
                                </strong>

                                <span>
                                    {t(
                                        "login.info.features.transactions.description"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="login-dashboard-preview">
                        <div className="preview-topbar">
                            <div>
                                <span className="preview-label">
                                    {t(
                                        "login.info.preview.title"
                                    )}
                                </span>

                                <strong className="preview-title">
                                    {t(
                                        "login.info.features.overview.title"
                                    )}
                                </strong>
                            </div>

                            <span className="preview-period">
                                {t("dateFilter.year")}
                            </span>
                        </div>

                        <div className="preview-cards">
                            <div className="preview-card">
                                <span className="preview-card-label">
                                    {t(
                                        "dashboard.income"
                                    )}
                                </span>

                                <strong>€ 4.280</strong>

                                <small className="preview-positive">
                                    +8.4%
                                </small>
                            </div>

                            <div className="preview-card">
                                <span className="preview-card-label">
                                    {t(
                                        "dashboard.expenses"
                                    )}
                                </span>

                                <strong>€ 2.145</strong>

                                <small className="preview-negative">
                                    +2.1%
                                </small>
                            </div>

                            <div className="preview-card">
                                <span className="preview-card-label">
                                    {t(
                                        "dashboard.balance"
                                    )}
                                </span>

                                <strong>€ 2.135</strong>

                                <small className="preview-positive">
                                    +12.7%
                                </small>
                            </div>
                        </div>

                        <div className="preview-chart-card">
                            <div className="preview-chart-header">
                                <div>
                                    <span className="preview-card-label">
                                        {t(
                                            "reports.monthlyCashflow"
                                        )}
                                    </span>

                                    <strong>
                                        € 2.135
                                    </strong>
                                </div>

                                <span className="preview-chart-period">
                                    {t(
                                        "login.info.preview.period"
                                    )}
                                </span>
                            </div>

                            <div
                                className="preview-chart"
                                aria-hidden="true"
                            >
                                <span className="chart-bar chart-bar-1" />
                                <span className="chart-bar chart-bar-2" />
                                <span className="chart-bar chart-bar-3" />
                                <span className="chart-bar chart-bar-4" />
                                <span className="chart-bar chart-bar-5" />
                                <span className="chart-bar chart-bar-6" />
                                <span className="chart-bar chart-bar-7" />
                                <span className="chart-bar chart-bar-8" />
                                <span className="chart-bar chart-bar-9" />
                                <span className="chart-bar chart-bar-10" />
                                <span className="chart-bar chart-bar-11" />
                                <span className="chart-bar chart-bar-12" />
                            </div>
                        </div>
                    </div>

                    <footer className="login-info-footer">
                        {t("login.info.footer")}
                    </footer>
                </div>
            </section>
        </main>
    );
}

export default Login;