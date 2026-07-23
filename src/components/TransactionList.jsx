import { useState, useMemo, useEffect } from "react";
import SortableHeader from "./SortableHeader";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import TransactionActions from "./TransactionActions";
import { useTranslation } from "react-i18next";


function TransactionList({
    title,
    transactions,
    deleteTransaction,
    editTransaction,
    sortColumn,
    sortDirection,
    handleSort,
    showActions = true,
    showSorting = true,
}) {


    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(
        transactions.length / itemsPerPage
    );

    const visibleTransactions = useMemo(() => {

        const start =
            (currentPage - 1) * itemsPerPage;


        return transactions.slice(
            start,
            start + itemsPerPage
        );

    }, [
        transactions,
        currentPage
    ]);

    useEffect(() => {

        setCurrentPage(1);

    }, [
        transactions
    ]);


    useEffect(() => {

        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }

    }, [
        currentPage,
        totalPages
    ]);

    return (

        <section>
            <h2>
                {title} ({transactions.length})
            </h2>

            {transactions.length === 0 ? (
                <p>{t("transactionList.noTransactions")}</p>
            ) : (
                <table className="transaction-table">
                    <thead>
                        <tr>
                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.date")}
                                    column="date"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            ) : (
                                <th>{t("transactionList.date")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.description")}
                                    column="description"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            ) : (
                                <th>{t("transactionList.description")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.category")}
                                    column="category"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            ) : (
                                <th>{t("transactionList.category")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.type")}
                                    column="type"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            ) : (
                                <th>{t("transactionList.type")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.amount")}
                                    column="amount"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            ) : (
                                <th>{t("transactionList.amount")}</th>
                            )}

                            {showActions && <th>{t("transactionList.actions")}</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleTransactions.map((transaction) => (

                            <tr key={transaction.id}>
                                <td>{formatDate(transaction.date)}</td>
                                <td>{transaction.description}</td>
                                <td>{t(`categories.${transaction.category}`)}</td>
                                <td>
                                    {transaction.type === "income"
                                        ? t("transactions.income")
                                        : t("transactions.expense")}
                                </td>
                                <td>
                                    <span
                                        className={
                                            transaction.amount < 0
                                                ? "expense"
                                                : "income"
                                        }
                                    >
                                        {transaction.amount < 0 ? "-" : "+"}{" "}
                                        {formatCurrency(Math.abs(transaction.amount))}
                                    </span>
                                </td>
                                {showActions && (
                                    <td>
                                        <TransactionActions
                                            transaction={transaction}
                                            editTransaction={editTransaction}
                                            deleteTransaction={deleteTransaction}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
            {transactions.length > itemsPerPage && (

                <div className="pagination">

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(page => page - 1)
                        }
                    >
                        {t("pagination.previous")}
                    </button>


                    <span>
                        {t("pagination.pageOf", {
                            current: currentPage,
                            total: totalPages,
                        })}
                    </span>


                    <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage(page => page + 1)
                        }
                    >
                        {t("pagination.next")}
                    </button>

                </div>

            )}
        </section>
    );
}
export default TransactionList;