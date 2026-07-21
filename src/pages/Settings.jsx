import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useTransactions } from "../hooks/useTransactions";
import CSVImport from "../components/CSVImport";
import { exportToCSV } from "../utils/exportToCSV";
import { exportToPDF } from "../utils/exportToPDF";
import { useTranslation } from "react-i18next";

function Settings() {

    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(
        localStorage.getItem("language") || i18n.language || "nl"
    );

    const {
        clearAllData,
        transactions,
    } = useTransactions();

    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(null);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        setMessage(null);
        setShowModal(true);
    };

    const handleConfirmClear = () => {
        clearAllData();
        handleCloseModal();
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
            section: "import-export",
        });
    };

    const handleExportToPDF = () => {

        exportToPDF(transactions);

        setMessage({
            type: "success",
            text: t("settings.messages.csvExportSuccess"),
            section: "import-export",
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
                <Button variant="danger" onClick={handleShowModal}>
                    {t("settings.clearData")}
                </Button>
                {message && message.section === "data" && (
                    <Alert variant={message.type} style={{ marginTop: '1rem' }}>
                        {message.text}
                    </Alert>
                )}
            </section>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("settings.confirmation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t("settings.clearDataMessage")}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        {t("common.cancel")}
                    </Button>

                    <Button variant="danger" onClick={handleConfirmClear}>
                        {t("common.delete")}
                    </Button>
                </Modal.Footer>
            </Modal>

            <section>
                <h2>{t("settings.importExport")}</h2>
                <CSVImport
                    setMessage={setMessage}
                />
                <Button
                    variant="primary"
                    onClick={handleExportToCSV}
                    style={{ marginTop: "1rem" }}
                    disabled={transactions.length === 0}
                >
                    {t("settings.exportCsv")}
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleExportToPDF}
                    style={{ marginTop: "1rem", marginLeft: "1rem" }}
                    disabled={transactions.length === 0}
                >
                    {t("settings.exportPdf")}
                </Button>

                {message && message.section === "import-export" && (
                    <Alert variant={message.type} style={{ marginTop: '1rem' }}>
                        {message.text}
                    </Alert>
                )}
            </section>

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