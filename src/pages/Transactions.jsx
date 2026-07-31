import { useState, useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import TransactionToolbar from "../components/TransactionToolbar";
import { useTranslation } from "react-i18next";
import { startOfToday, startOfMonth, startOfYear, endOfToday, endOfMonth, endOfYear } from "date-fns";
import TransactionDrawer from "../components/TransactionDrawer";

function Transactions() {

    const { t, i18n } = useTranslation();

    // Transaction data and actions from global transaction store
    const {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();


    // Drawer state for adding and editing transactions
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);


    // Filter and search state
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("custom"); // all, today, month, year or custom
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Sorting state
    const [sortColumn, setSortColumn] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");


    // Returns category names in multiple languages for searching
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
            .map(value => value.toLowerCase());
    }


    // Creates the visible transaction list based on filters and search criteria
    const filteredTransactions = useMemo(() => {

        let dateFiltered = transactions;

        let start, end;


        // Apply date filtering
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
                    end.setHours(23, 59, 59, 999);
                }
                break;

            default:
                break;
        }


        // Remove transactions outside selected date range
        dateFiltered = transactions.filter((transaction) => {

            const transactionDate = new Date(transaction.date);

            if (start && transactionDate < start) {
                return false;
            }

            if (end && transactionDate > end) {
                return false;
            }

            return true;
        });


        // Apply search and transaction type filters
        return dateFiltered.filter((transaction) => {

            const searchTerm = search.toLowerCase().trim();


            // Translated category search support
            const translatedCategory = t(
                `categories.${transaction.category}`
            ).toLowerCase();


            const categoryTerms = getCategorySearchTerms(
                transaction.category
            );


            const matchesCategory = categoryTerms.some(term =>
                term.includes(searchTerm)
            );


            // Search in description, name, category and amount
            const matchesSearch =
                transaction.description
                    .toLowerCase()
                    .includes(searchTerm) ||

                transaction.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                matchesCategory ||

                transaction.amount
                    .toString()
                    .includes(searchTerm);


            const matchesFilter =
                filter === "all" ||
                transaction.type === filter;


            // Transaction is visible only when all filters match
            return (
                matchesSearch &&
                matchesFilter
            );
        });


    }, [transactions, search, filter, dateFilter, startDate, endDate, i18n.language]);


    const sortedTransactions = useMemo(() => {
        return [...filteredTransactions].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (aValue < bValue) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [filteredTransactions, sortColumn, sortDirection]);


    function handleSort(column) {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    }


    // Open drawer for creating a new transaction
    function handleAdd() {
        setSelectedTransaction(null);
        setIsDrawerOpen(true);
    }


    // Open drawer for editing an existing transaction
    function handleEdit(transaction) {
        setSelectedTransaction(transaction);
        setIsDrawerOpen(true);
    }


    // Close drawer and clear selected transaction
    function handleCloseDrawer() {
        setIsDrawerOpen(false);
        setSelectedTransaction(null);
    }


    return (

        <div className="transactions-page">

            <h1>{t("transactions.title")}</h1>


            {/* Button to create a new transaction */}
            <button onClick={handleAdd}>
                {t("transactions.new")}
            </button>


            {/* Add/edit transaction drawer */}
            <TransactionDrawer
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                transaction={selectedTransaction}
                addTransaction={addTransaction}
                updateTransaction={updateTransaction}
            />

            {/* Search and filter controls */}
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

            {/* Transaction list */}
            <TransactionList
                title={t("transactions.title")}
                transactions={sortedTransactions}
                editTransaction={handleEdit}
                deleteTransaction={deleteTransaction}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
            />

        </div>
    );
}

export default Transactions;