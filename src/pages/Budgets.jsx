import { useState } from "react";
import { useTranslation } from "react-i18next";
import BudgetList from "../components/budgets/BudgetList";
import { calculateBudgetProgress } from "../utils/calculateBudgetProgress";
import { useTransactions } from "../hooks/useTransactions";
import BudgetProgress from "../components/budgets/BudgetProgress";
import useBudgets from "../hooks/useBudgets";
import BudgetDrawer from "../components/budgets/BudgetDrawer";
import CategoryDrawer from "../components/budgets/CategoryDrawer";
import TransactionDrawer from "../components/transactions/TransactionDrawer";

function Budgets() {
    const { t } = useTranslation();

    const {
        transactions,
        addTransaction,
        updateTransaction,
    } = useTransactions();

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [selectedBudget, setSelectedBudget] =
        useState(null);

    const [categoryDrawerOpen, setCategoryDrawerOpen] =
        useState(false);

    const [
        selectedCategoryBudget,
        setSelectedCategoryBudget,
    ] = useState(null);

    const [
        transactionDrawerOpen,
        setTransactionDrawerOpen,
    ] = useState(false);

    const [
        selectedTransaction,
        setSelectedTransaction,
    ] = useState(null);

    const [
        transactionInitialCategory,
        setTransactionInitialCategory,
    ] = useState(null);

    const {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
    } = useBudgets();

    const budgetProgress =
        calculateBudgetProgress(
            budgets,
            transactions
        );

    function openDrawer(budget = null) {
        document.activeElement?.blur();

        setSelectedBudget(budget);
        setDrawerOpen(true);
    }

    function closeDrawer() {
        setDrawerOpen(false);
        setSelectedBudget(null);
    }

    function openCategoryDrawer(budget) {
        document.activeElement?.blur();

        setSelectedCategoryBudget(budget);
        setCategoryDrawerOpen(true);
    }

    function closeCategoryDrawer() {
        setCategoryDrawerOpen(false);
        setSelectedCategoryBudget(null);
    }

    function openTransaction(transaction) {
        setTransactionInitialCategory(null);
        setSelectedTransaction(transaction);
        setTransactionDrawerOpen(true);
    }

    function openTransactionForCategory(category) {
        setCategoryDrawerOpen(false);

        setSelectedTransaction(null);
        setTransactionInitialCategory(category);
        setTransactionDrawerOpen(true);
    }

    function closeTransactionDrawer() {
        setTransactionDrawerOpen(false);
        setSelectedTransaction(null);
        setTransactionInitialCategory(null);
    }

    return (
        <div className="budgets-page">
            <h1>
                {t("budgets.title")}
            </h1>

            <p>
                {t("budgets.description")}
            </p>

            <button
                className="add-budget-button"
                onClick={() => openDrawer()}
            >
                {t("budgets.addTitle")}
            </button>

            <BudgetList
                budgets={budgetProgress}
                deleteBudget={deleteBudget}
                onEdit={openDrawer}
                onCategoryClick={
                    openCategoryDrawer
                }
            />

            {budgetProgress.map((budget) => (
                <BudgetProgress
                    key={budget.id}
                    budget={budget}
                    onCategoryClick={
                        openCategoryDrawer
                    }
                />
            ))}

            <BudgetDrawer
                open={drawerOpen}
                onClose={closeDrawer}
                budget={selectedBudget}
                addBudget={addBudget}
                updateBudget={updateBudget}
            />

            <CategoryDrawer
                open={categoryDrawerOpen}
                onClose={closeCategoryDrawer}
                budget={selectedCategoryBudget}
                transactions={transactions}
                onTransactionClick={
                    openTransaction
                }
                onAddTransaction={
                    openTransactionForCategory
                }
            />

            <TransactionDrawer
                open={transactionDrawerOpen}
                onClose={
                    closeTransactionDrawer
                }
                transaction={
                    selectedTransaction
                }
                addTransaction={
                    addTransaction
                }
                updateTransaction={
                    updateTransaction
                }
                initialCategory={
                    transactionInitialCategory
                }
            />
        </div>
    );
}

export default Budgets;