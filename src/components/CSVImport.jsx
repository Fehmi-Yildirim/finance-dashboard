import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { parseCSV } from "../services/csvParser";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/formatCurrency";

function CSVImport({ setMessage }) {

    const { t } = useTranslation();

    const {
        transactions,
        importTransactions,
    } = useTransactions();

    const [newTransactions, setNewTransactions] = useState([]);
    const [existingCount, setExistingCount] = useState(0);
    const [newCount, setNewCount] = useState(0);
    const [allImported, setAllImported] = useState([]);

    const fileInputRef = useRef(null);

    function createKey(transaction) {
        return (
            `${transaction.date} -${transaction.description} -${transaction.amount} `
                .toLowerCase()
        );
    }

    function handleFile(event) {

        const file = event.target.files[0];

        if (!file) return;

        setMessage(null);

        const reader = new FileReader();

        reader.onload = () => {

            const imported = parseCSV(reader.result);

            const existingKeys = new Set(
                transactions.map(createKey)
            );

            const uniqueNewTransactions =
                imported.filter(transaction =>
                    !existingKeys.has(createKey(transaction))
                );

            setAllImported(imported);

            setExistingCount(
                imported.length - uniqueNewTransactions.length
            );

            setNewCount(
                uniqueNewTransactions.length
            );

            setNewTransactions(
                uniqueNewTransactions
            );
        };

        reader.readAsText(file);
    }

    function resetImport() {

        setNewTransactions([]);
        setExistingCount(0);
        setNewCount(0);
        setAllImported([]);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleImport() {

        importTransactions(newTransactions);

        setMessage({
            type: "success",
            text: t("csvImport.success", {
                newCount,
                existingCount,
                total: newCount + existingCount,
            }),
            section: "import-export",
        });

        resetImport();
    }

    const hasNewTransactions = newCount > 0;

    return (

        <div className="csv-import">

            <div className="csv-file-upload">

                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFile}
                    ref={fileInputRef}
                    id="csv-upload"
                    hidden
                />

                <label htmlFor="csv-upload" className="csv-upload-button">
                    {t("csvImport.chooseFile")}
                </label>

            </div>

            {(existingCount > 0 || newCount > 0) && (
                <div>
                    <p>
                        {t("csvImport.existing")}: {existingCount}
                    </p>
                    <p>
                        {t("csvImport.new")}: {newCount}
                    </p>
                </div>
            )}

            {newCount === 0 && existingCount > 0 && (

                <p>
                    {t("csvImport.noNew")}
                </p>

            )}

            {allImported.length > 0 && (

                <div className="csv-preview">

                    <h3>
                        {t("csvPreview.transactionsFound", {
                            count: allImported.length,
                        })}
                    </h3>

                    <table className="transaction-table">

                        <thead>

                            <tr>
                                <th>{t("csvPreview.date")}</th>
                                <th>{t("csvPreview.description")}</th>
                                <th>{t("csvPreview.amount")}</th>
                                <th>{t("csvPreview.type")}</th>
                            </tr>

                        </thead>

                        <tbody>

                            {allImported
                                .slice(0, 10)
                                .map(transaction => (

                                    <tr key={transaction.id}>

                                        <td>
                                            {transaction.date}
                                        </td>

                                        <td>
                                            {transaction.description}
                                        </td>

                                        <td>
                                            {formatCurrency(transaction.amount)}
                                        </td>

                                        <td>
                                            {transaction.type === "income"
                                                ? t("transactions.income")
                                                : t("transactions.expense")}
                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                    {allImported.length > 10 && (

                        <p>
                            {t("csvPreview.firstTen", {
                                count: allImported.length,
                            })}
                        </p>

                    )}

                    <div className="csv-actions">

                        <button
                            onClick={handleImport}
                            disabled={!hasNewTransactions}
                        >
                            {t("csvPreview.import")}
                        </button>

                        <button
                            className="delete-button"
                            onClick={resetImport}
                        >
                            {t("common.cancel")}
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default CSVImport;
