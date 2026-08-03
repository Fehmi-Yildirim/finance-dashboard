import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { importFile, } from "../services/import";
import { runImportTest } from "../services/import/runImportTest";
import { runPipelineTrace } from "../services/import/runPipelineTrace";
import { useTransactions } from "../hooks/useTransactions";
import useBudgets from "../hooks/useBudgets";
import { formatCurrency } from "../utils/formatCurrency";
import { createBudgetCategories } from "../utils/createBudgetCategories";

function ImportView({ setMessage }) {

    const { t } = useTranslation();
    const { transactions, importTransactions } = useTransactions();
    const { initializeBudgets } = useBudgets();
    const [newTransactions, setNewTransactions] = useState([]);
    const [existingCount, setExistingCount] = useState(0);
    const [newCount, setNewCount] = useState(0);
    const [allImported, setAllImported] = useState([]);
    const fileInputRef = useRef(null);

    async function handleFile(event) {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        setMessage(null);

        try {

            const result = await importFile(file);
            //const result = await runImportTest(file);
            //const result = await runPipelineTrace(file);

            const imported = result.transactions || [];
            setAllImported(imported);
            setNewTransactions(imported);
            setNewCount(imported.length);
            setExistingCount(0);
        }
        catch (error) {
            setMessage({
                type: "danger",
                text:
                    error.message,
                section: "import",
            });
        }

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

        importTransactions(
            newTransactions
        );

        const categories =
            createBudgetCategories(
                newTransactions
            );

        initializeBudgets(
            categories
        );

        setMessage({
            type: "success",
            text: t("importView.success", {
                newCount,
                existingCount,
                total:
                    newCount +
                    existingCount,
            }),
            section: "import",
        });

        resetImport();

    }

    const hasNewTransactions =
        newCount > 0;

    return (

        <div className="import-view">

            <div className="import-file-upload">
                <input
                    type="file"
                    accept=".csv,.txt,.xlsx,.xls,.json"
                    onChange={handleFile}
                    ref={fileInputRef}
                    id="import-upload"
                    hidden
                />
                <label
                    htmlFor="import-upload"
                    className="import-upload-button"
                >
                    {t("importView.chooseFile")}
                </label>
            </div>

            {(existingCount > 0 || newCount > 0) && (
                <div>
                    <p>
                        {t("importView.existing")}: {existingCount}
                    </p>
                    <p>
                        {t("importView.new")}: {newCount}
                    </p>
                </div>
            )}

            {newCount === 0 && existingCount > 0 && (
                <p>
                    {t("importView.noNew")}
                </p>
            )}

            {allImported.length > 0 && (

                <div className="import-preview">
                    <h3>
                        {t("importPreview.transactionsFound", {
                            count:
                                allImported.length,
                        })}
                    </h3>

                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>
                                    {t("importPreview.date")}
                                </th>
                                <th>
                                    {t("importPreview.name")}
                                </th>
                                <th>
                                    {t("importPreview.description")}
                                </th>
                                <th>
                                    {t("importPreview.amount")}
                                </th>
                                <th>
                                    {t("importPreview.type")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allImported.slice(0, 10).map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td className="date-cell">
                                        {transaction.date}
                                    </td>
                                    <td>
                                        {transaction.name}
                                    </td>
                                    <td>
                                        {transaction.description}
                                    </td>
                                    <td className="date-cell">
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
                            {t("importPreview.firstTen", {
                                count:
                                    allImported.length,

                            })}
                        </p>
                    )}

                    <div className="import-actions">
                        <button
                            onClick={handleImport}
                            disabled={!hasNewTransactions}
                        >
                            {t("importPreview.import")}
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

export default ImportView;