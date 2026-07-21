import { useState, useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import TransactionToolbar from "../components/TransactionToolbar";
import { useTranslation } from "react-i18next";
import { startOfToday, startOfMonth, startOfYear, endOfToday, endOfMonth, endOfYear } from "date-fns";
import TransactionDrawer from "../components/TransactionDrawer";

function Transactions() {
    const { t } = useTranslation();

    const {
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    // Drawer pop-up
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("custom"); // all, today, year or custom
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const filteredTransactions = useMemo(() => {
        let dateFiltered = transactions;

        let start, end;

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

        return dateFiltered.filter(
            (transaction) =>
                (transaction.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                    transaction.category
                        .toLowerCase()
                        .includes(search.toLowerCase())) &&
                (filter === "all" || transaction.type === filter)
        );
    }, [transactions, search, filter, dateFilter, startDate, endDate]);

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
            <h1>{t("transactions.title")}</h1>

            <button onClick={handleAdd}>{t("transactions.new")}</button>


            <TransactionDrawer
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                transaction={selectedTransaction}
                addTransaction={addTransaction}
                updateTransaction={updateTransaction}
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
                transactions={filteredTransactions}
                editTransaction={handleEdit}
                deleteTransaction={deleteTransaction}
            />
        </div>
    );
}

export default Transactions;