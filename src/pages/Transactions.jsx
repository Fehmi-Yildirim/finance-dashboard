import { useState, useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionList from "../components/transactions/TransactionList";
import TransactionDrawer from "../components/transactions/TransactionDrawer";
import TransactionToolbar from "../components/transactions/TransactionToolbar";
import { useTranslation } from "react-i18next";
import {
    startOfToday,
    startOfMonth,
    startOfYear,
    endOfToday,
    endOfMonth,
    endOfYear,
} from "date-fns";

function Transactions() {
    const { t, i18n } = useTranslation();

    const {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    const [isDrawerOpen, setIsDrawerOpen] =
        useState(false);

    const [
        selectedTransaction,
        setSelectedTransaction,
    ] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [dateFilter, setDateFilter] =
        useState("custom");

    const [startDate, setStartDate] =
        useState(null);

    const [endDate, setEndDate] =
        useState(null);

    const [sortColumn, setSortColumn] =
        useState("date");

    const [sortDirection, setSortDirection] =
        useState("desc");

    function getCategorySearchTerms(category) {
        return [
            category,
            i18n.t(`categories.${category}`, {
                lng: "nl",
            }),
            i18n.t(`categories.${category}`, {
                lng: "en",
            }),
        ]
            .filter(Boolean)
            .map((value) => value.toLowerCase());
    }

    const filteredTransactions = useMemo(() => {
        let start;
        let end;

        switch (dateFilter) {
            case "today":
                start = startOfToday();
                end = endOfToday();
                break;

            case "month":
                start = startOfMonth(new Date());
                end = endOfMonth(new Date());
                break;

            case "year":
                start = startOfYear(new Date());
                end = endOfYear(new Date());
                break;

            case "custom":
                start = startDate;
                end = endDate
                    ? new Date(endDate)
                    : null;

                if (end) {
                    end.setHours(
                        23,
                        59,
                        59,
                        999
                    );
                }
                break;

            default:
                break;
        }

        return transactions.filter(
            (transaction) => {
                const transactionDate =
                    new Date(transaction.date);

                if (
                    start &&
                    transactionDate < start
                ) {
                    return false;
                }

                if (
                    end &&
                    transactionDate > end
                ) {
                    return false;
                }

                const searchTerm =
                    search.toLowerCase().trim();

                const categoryTerms =
                    getCategorySearchTerms(
                        transaction.category
                    );

                const matchesSearch =
                    transaction.description
                        .toLowerCase()
                        .includes(searchTerm) ||
                    transaction.name
                        .toLowerCase()
                        .includes(searchTerm) ||
                    categoryTerms.some((term) =>
                        term.includes(searchTerm)
                    ) ||
                    String(transaction.amount)
                        .toLowerCase()
                        .includes(searchTerm);

                const matchesFilter =
                    filter === "all" ||
                    transaction.type === filter;

                return (
                    matchesSearch &&
                    matchesFilter
                );
            }
        );
    }, [
        transactions,
        search,
        filter,
        dateFilter,
        startDate,
        endDate,
        i18n.language,
    ]);

    const sortedTransactions = useMemo(() => {
        return [...filteredTransactions].sort(
            (a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (sortColumn === "amount") {
                    const valA = a.amount;
                    const valB = b.amount;

                    return sortDirection === "asc"
                        ? valA - valB
                        : valB - valA;
                }

                if (aValue < bValue) {
                    return sortDirection === "asc"
                        ? -1
                        : 1;
                }

                if (aValue > bValue) {
                    return sortDirection === "asc"
                        ? 1
                        : -1;
                }

                return 0;
            }
        );
    }, [
        filteredTransactions,
        sortColumn,
        sortDirection,
    ]);

    function handleSort(column) {
        if (sortColumn === column) {
            setSortDirection(
                sortDirection === "asc"
                    ? "desc"
                    : "asc"
            );
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    }

    function handleAdd() {
        setSelectedTransaction(null);
        setIsDrawerOpen(true);
    }

    function handleEdit(transaction) {
        setSelectedTransaction(transaction);
        setIsDrawerOpen(true);
    }

    function handleCloseDrawer() {
        setIsDrawerOpen(false);
        setSelectedTransaction(null);
    }

    return (
        <div className="transactions-page">
            <h1>
                {t("transactions.title")}
            </h1>

            <button
                type="button"
                className="add-transaction-button"
                onClick={handleAdd}
            >
                {t("transactions.new")}
            </button>

            <TransactionDrawer
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                transaction={
                    selectedTransaction
                }
                addTransaction={addTransaction}
                updateTransaction={
                    updateTransaction
                }
            />

            <TransactionToolbar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <TransactionList
                title={t("transactions.title")}
                transactions={sortedTransactions}
                editTransaction={handleEdit}
                deleteTransaction={
                    deleteTransaction
                }
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
            />
        </div>
    );
}

export default Transactions;
