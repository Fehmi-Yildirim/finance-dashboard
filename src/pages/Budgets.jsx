import { useState } from "react";
import { useTranslation } from "react-i18next";
import BudgetList from "../components/BudgetList";
import useBudgets from "../hooks/useBudgets";
import { calculateBudgetProgress } from "../utils/calculateBudgetProgress";
import { useTransactions } from "../hooks/useTransactions";
import BudgetProgress from "../components/BudgetProgress";
import BudgetDrawer from "../components/BudgetDrawer";

function Budgets() {

    const { t } = useTranslation();
    const { transactions } = useTransactions();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
    } = useBudgets();

    const budgetProgress = calculateBudgetProgress(
        budgets,
        transactions
    );


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
                onClick={() => {
                    setSelectedBudget(null);
                    setDrawerOpen(true);
                }}
            >
                {t("budgets.addTitle")}
            </button>

            <BudgetList
                budgets={budgetProgress}
                deleteBudget={deleteBudget}
                onEdit={(budget) => {
                    setSelectedBudget(budget);
                    setDrawerOpen(true);
                }}
            />

            {budgetProgress.map((budget) => (
                <BudgetProgress
                    key={budget.id}
                    budget={budget}
                />
            ))}

            <BudgetDrawer
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setSelectedBudget(null);
                }}
                budget={selectedBudget}
                addBudget={addBudget}
                updateBudget={updateBudget}
            />
        </div>
    );
}

export default Budgets;

