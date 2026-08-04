import { useState } from "react";
import { useTranslation } from "react-i18next";
import BudgetList from "../components/budgets/BudgetList";
import { calculateBudgetProgress } from "../utils/calculateBudgetProgress";
import { useTransactions } from "../hooks/useTransactions";
import BudgetProgress from "../components/budgets/BudgetProgress";
import useBudgets from "../hooks/useBudgets";
import BudgetDrawer from "../components/budgets/BudgetDrawer";

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


    function openDrawer(budget = null) {

        // Remove focus from dropdown/buttons before MUI hides background
        document.activeElement?.blur();

        setSelectedBudget(budget);
        setDrawerOpen(true);
    }

    function closeDrawer() {

        setDrawerOpen(false);
        setSelectedBudget(null);
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
            />

            {budgetProgress.map((budget) => (
                <BudgetProgress
                    key={budget.id}
                    budget={budget}
                />
            ))}

            <BudgetDrawer
                open={drawerOpen}
                onClose={closeDrawer}
                budget={selectedBudget}
                addBudget={addBudget}
                updateBudget={updateBudget}
            />

        </div>
    );
}

export default Budgets;