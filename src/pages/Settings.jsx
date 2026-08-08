import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { useTransactions } from "../hooks/useTransactions";
import ImportView from "../components/ImportView";
import { exportToCSV } from "../utils/exportToCSV";
import { exportToPDF } from "../utils/exportToPDF";
import { useTranslation } from "react-i18next";
import useBudgets from "../hooks/useBudgets";

function Settings() {
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(
        localStorage.getItem("language") ||
        i18n.language ||
        "nl"
    );

    const {
        clearTransactions,
        transactions,
        isDemo: transactionsDemo,
    } = useTransactions();

    const {
        clearBudgets,
        isDemo: budgetsDemo,
    } = useBudgets();

    const [showConfirmation, setShowConfirmation] =
        useState(false);

    const [message, setMessage] =
        useState(null);

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem("darkMode") === "true"
        );

    const hasUserData =
        !transactionsDemo ||
        !budgetsDemo;

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);

        localStorage.setItem(
            "language",
            lang
        );
    };

    const handleShowConfirmation = () => {
        setMessage(null);
        setShowConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleConfirmClearData = () => {
        clearTransactions();
        clearBudgets();

        setShowConfirmation(false);

        setMessage({
            type: "success",
            text: t(
                "settings.messages.applicationDataCleared"
            ),
            section: "data",
        });
    };

    const handleExportToCSV = () => {
        exportToCSV(transactions);

        setMessage({
            type: "success",
            text: t(
                "settings.messages.csvExportSuccess"
            ),
            section: "export",
        });
    };

    const handleExportToPDF = () => {
        exportToPDF(transactions);

        setMessage({
            type: "success",
            text: t(
                "settings.messages.pdfExportSuccess"
            ),
            section: "export",
        });
    };

    return (
        <div>
            <h1>
                {t("settings.title")}
            </h1>

            <section>
                <h2>
                    {t("settings.language")}
                </h2>

                <Form.Select
                    value={language}
                    onChange={(e) =>
                        handleLanguageChange(
                            e.target.value
                        )
                    }
                    style={{
                        maxWidth: "250px",
                    }}
                >
                    <option value="nl">
                        🇳🇱 Nederlands
                    </option>

                    <option value="en">
                        🇬🇧 English
                    </option>
                </Form.Select>
            </section>

            {hasUserData && (
                <section>
                    <h2>
                        {t("settings.data")}
                    </h2>

                    {message &&
                        message.section === "data" && (
                            <Alert
                                variant={
                                    message.type
                                }
                                style={{
                                    marginTop:
                                        "1rem",
                                }}
                            >
                                {message.text}
                            </Alert>
                        )}

                    <p>
                        {t(
                            "settings.clearApplicationDescription"
                        )}
                    </p>

                    <Button
                        variant="danger"
                        onClick={
                            handleShowConfirmation
                        }
                    >
                        {t(
                            "settings.clearApplicationData"
                        )}
                    </Button>
                </section>
            )}

            <ConfirmationDialog
                show={showConfirmation}
                onClose={
                    handleCloseConfirmation
                }
                onConfirm={
                    handleConfirmClearData
                }
                title={t(
                    "settings.confirmation"
                )}
                message={t(
                    "settings.clearApplicationDescription"
                )}
                confirmText={t(
                    "settings.clearApplicationData"
                )}
                confirmVariant="danger"
            />

            <section>
                <h2>
                    {t(
                        "settings.importTransactions"
                    )}
                </h2>

                <ImportView
                    setMessage={setMessage}
                />

                {message &&
                    message.section === "import" && (
                        <Alert
                            variant={
                                message.type
                            }
                        >
                            {message.text}
                        </Alert>
                    )}
            </section>

            <section>
                <h2>
                    {t(
                        "settings.exportTransactions"
                    )}
                </h2>

                <Button
                    variant="primary"
                    onClick={
                        handleExportToCSV
                    }
                    disabled={
                        transactions.length === 0
                    }
                >
                    {t(
                        "settings.exportCsv"
                    )}
                </Button>

                <Button
                    variant="secondary"
                    onClick={
                        handleExportToPDF
                    }
                    style={{
                        marginLeft: "1rem",
                    }}
                    disabled={
                        transactions.length === 0
                    }
                >
                    {t(
                        "settings.exportPdf"
                    )}
                </Button>

                {message &&
                    message.section === "export" && (
                        <Alert
                            variant={
                                message.type
                            }
                            style={{
                                marginTop:
                                    "1rem",
                            }}
                        >
                            {message.text}
                        </Alert>
                    )}
            </section>

            <section>
                <h2>
                    {t("settings.appearance")}
                </h2>

                <Form.Check
                    type="switch"
                    id="dark-mode-switch"
                    label={
                        darkMode
                            ? t(
                                "settings.lightMode"
                            )
                            : t(
                                "settings.darkMode"
                            )
                    }
                    checked={darkMode}
                    onChange={(e) => {
                        const enabled =
                            e.target.checked;

                        setDarkMode(enabled);

                        localStorage.setItem(
                            "darkMode",
                            enabled
                        );

                        document.documentElement.classList.toggle(
                            "dark-mode",
                            enabled
                        );
                    }}
                />
            </section>
        </div>
    );
}

export default Settings;