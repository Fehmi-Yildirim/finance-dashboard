import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import "./LoginForm.css";

function LoginForm() {
    const { t } = useTranslation();
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const handleDemoLogin = async () => {
        try {
            await login("demo@example.com", "demo123");
            navigate("/", { replace: true });
        } catch {
            // The authentication error is already stored by the auth context.
        }
    };

    return (
        <section className="login-form-wrapper">
            <div className="login-form-card">

                <div className="login-form-header">
                    <h1>
                        {t("login.welcome")}
                    </h1>

                    <p>
                        {t("login.description")}
                    </p>
                </div>

                <div className="demo-account">

                    <div className="demo-account-header">
                        <span
                            className="demo-account-icon"
                            aria-hidden="true"
                        >
                            👤
                        </span>

                        <div>
                            <h2>
                                {t("login.demo.title")}
                            </h2>

                            <p>
                                {t("login.demo.description")}
                            </p>
                        </div>
                    </div>

                    <div className="demo-account-details">

                        <div className="demo-account-field">
                            <span>
                                {t("login.demo.email")}
                            </span>

                            <strong>
                                demo@example.com
                            </strong>
                        </div>

                        <div className="demo-account-field">
                            <span>
                                {t("login.demo.password")}
                            </span>

                            <strong>
                                demo123
                            </strong>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="login-submit"
                        onClick={handleDemoLogin}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? t("login.demo.submitting")
                            : t("login.demo.submit")}
                    </button>

                </div>

                {error && (
                    <div
                        className="login-form-error"
                        role="alert"
                    >
                        {t("login.invalidCredentials")}
                    </div>
                )}

                {/*
                    ORIGINAL LOGIN FORM
                    -------------------
                    Keep this code for the final product.

                    <form
                        onSubmit={handleSubmit}
                        className="login-form"
                    >
                        <div className="form-field">
                            <label htmlFor="email">
                                {t("login.email")}
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder={t("login.emailPlaceholder")}
                                autoComplete="email"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">
                                {t("login.password")}
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder={t("login.passwordPlaceholder")}
                                autoComplete="current-password"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {error && (
                            <div
                                className="login-form-error"
                                role="alert"
                            >
                                {t("login.invalidCredentials")}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? t("login.submitting")
                                : t("login.submit")}
                        </button>
                    </form>
                */}

            </div>
        </section>
    );
}

export default LoginForm;