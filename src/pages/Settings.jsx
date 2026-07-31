import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useTransactions } from "../hooks/useTransactions";
import ImportView from "../components/ImportView";
import { exportToCSV } from "../utils/exportToCSV";
import { exportToPDF } from "../utils/exportToPDF";
import { useTranslation } from "react-i18next";
import useBudgets from "../hooks/useBudgets";


function Settings() {

    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || i18n.language || "nl"
    );

    const {
        clearTransactions,
        transactions,
    } = useTransactions();

    const {
        clearBudgets,
    } = useBudgets();

    const [showBudgetConfirmation, setShowBudgetConfirmation] = useState(false);

    const handleCloseBudgetConfirmation = () =>
        setShowBudgetConfirmation(false);

    const handleShowBudgetConfirmation = () => {
        setMessage(null);
        setShowBudgetConfirmation(true);
    };

    const handleConfirmClearBudgets = () => {

        clearBudgets();

        setShowBudgetConfirmation(false);

        setMessage({
            type: "success",
            text: t("settings.messages.budgetsCleared"),
            section: "data",
        });

    };

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [message, setMessage] = useState(null);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const handleCloseConfirmation = () =>
        setShowConfirmation(false);

    const handleShowConfirmation = () => {
        setMessage(null);
        setShowConfirmation(true);
    };

    const handleConfirmClear = () => {

        clearTransactions();

        setMessage({
            type: "success",
            text: t("settings.messages.dataCleared"),
            section: "data",
        });

    };

    const handleExportToCSV = () => {

        exportToCSV(transactions);

        setMessage({
            type: "success",
            text: t("settings.messages.csvExportSuccess"),
            section: "export",
        });
    };

    const handleExportToPDF = () => {

        exportToPDF(transactions);

        setMessage({
            type: "success",
            text: t("settings.messages.pdfExportSuccess"),
            section: "export",
        });

    };

    return (
        <div>
            <h1>{t("settings.title")}</h1>

            <section>
                <h2>{t("settings.language")}</h2>

                <Form.Select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    style={{ maxWidth: "250px" }}
                >
                    <option value="nl">🇳🇱 Nederlands</option>
                    <option value="en">🇬🇧 English</option>
                </Form.Select>
            </section>

            <section>
                <h2>{t("settings.data")}</h2>

                {message && message.section === "data" && (
                    <Alert variant={message.type} style={{ marginTop: '1rem' }}>
                        {message.text}
                    </Alert>
                )}
                <h3>{t("settings.transactions")}</h3>
                <p>
                    {t("settings.clearTransactionsDescription")}
                </p>
                <Button
                    variant="danger"
                    onClick={handleShowConfirmation}
                >
                    {t("settings.clearTransactions")}
                </Button>

                <h3>{t("settings.budgets")}</h3>
                <p>
                    {t("settings.clearBudgetsDescription")}
                </p>
                <Button
                    variant="warning"
                    onClick={handleShowBudgetConfirmation}
                >
                    {t("settings.clearBudgets")}
                </Button>
            </section>

            <ConfirmationDialog
                show={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmClear}
                title={t("settings.confirmation")}
                message={t("settings.clearDataMessage")}
                confirmText={t("settings.clearData")}
                confirmVariant="danger"
            />
            <section>
                <h2>{t("settings.importTransactions")}</h2>
                <ImportView setMessage={setMessage} />
                {message && message.section === "import" && (
                    <Alert variant={message.type} >
                        {message.text}
                    </Alert>
                )}
            </section>

            <section>
                <h2>{t("settings.exportTransactions")}</h2>
                <Button
                    variant="primary"
                    onClick={handleExportToCSV}
                    disabled={transactions.length === 0}
                >
                    {t("settings.exportCsv")}
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleExportToPDF}
                    style={{ marginLeft: "1rem" }}
                    disabled={transactions.length === 0}
                >
                    {t("settings.exportPdf")}
                </Button>
                {message && message.section === "export" && (
                    <Alert variant={message.type} style={{ marginTop: '1rem' }}>
                        {message.text}
                    </Alert>
                )}
            </section>

            <ConfirmationDialog
                show={showBudgetConfirmation}
                onClose={handleCloseBudgetConfirmation}
                onConfirm={handleConfirmClearBudgets}
                title={t("settings.confirmation")}
                message={t("settings.clearBudgetsDescription")}
                confirmText={t("settings.clearBudgets")}
                confirmVariant="warning"
            />

            <section>
                <h2>{t("settings.appearance")}</h2>
                <Form.Check
                    type="switch"
                    id="dark-mode-switch"
                    label={
                        darkMode
                            ? t("settings.lightMode")
                            : t("settings.darkMode")
                    }
                    checked={darkMode}
                    onChange={(e) => {
                        const enabled = e.target.checked;

                        setDarkMode(enabled);
                        localStorage.setItem("darkMode", enabled);

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