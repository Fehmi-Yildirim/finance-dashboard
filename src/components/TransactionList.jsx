import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SortableHeader from "./SortableHeader";
import ActionsDropdown from "./ActionsDropdown";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

function TransactionList({
    title,
    transactions,
    deleteTransaction,
    editTransaction,
    sortColumn: initialSortColumn,
    sortDirection: initialSortDirection,
    handleSort: onSort,
    showActions = true,
    showSorting = true,
}) {



    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = useState(1);

    const [sortColumn, setSortColumn] = useState(initialSortColumn);
    const [sortDirection, setSortDirection] = useState(initialSortDirection);


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

    const handleSort = (column) => {
        if (onSort) {
            onSort(column);
        } else {
            const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
            setSortColumn(column);
            setSortDirection(newDirection);
        }
    };

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
                                    onSort={onSort || handleSort}
                                />
                            ) : (
                                <th className="nowrap">{t("transactionList.date")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.name")}
                                    column="name"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={onSort || handleSort}
                                />
                            ) : (
                                <th>{t("transactionList.name")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.description")}
                                    column="description"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={onSort || handleSort}
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
                                    onSort={onSort || handleSort}
                                />
                            ) : (
                                <th className="nowrap">{t("transactionList.category")}</th>
                            )}

                            {showSorting ? (
                                <SortableHeader
                                    label={t("transactionList.type")}
                                    column="type"
                                    sortColumn={sortColumn}
                                    sortDirection={sortDirection}
                                    onSort={onSort || handleSort}
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
                                    onSort={onSort || handleSort}
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
                                <td className="nowrap">{formatDate(transaction.date)}</td>
                                <td>{transaction.name}</td>
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
                                        {transaction.amount < 0 || transaction.type === "expense" ? "-" : "+"}{" "}
                                        {formatCurrency(Math.abs(transaction.amount))}
                                    </span>
                                </td>
                                {showActions && (
                                    <td>
                                        <ActionsDropdown
                                            item={transaction}
                                            onEdit={editTransaction}
                                            onDelete={deleteTransaction}
                                            translationKey="transactionActions"
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