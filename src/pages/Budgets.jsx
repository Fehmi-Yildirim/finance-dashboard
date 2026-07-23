import { useTranslation } from "react-i18next";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import useBudgets from "../hooks/useBudgets";
import { calculateBudgetProgress } from "../utils/calculateBudgetProgress";
import { calculateBudgetTotals } from "../utils/calculateBudgetTotals";
import { useTransactions } from "../hooks/useTransactions";
import BudgetProgress from "../components/BudgetProgress";

function Budgets() {
    const { t } = useTranslation();
    const { transactions } = useTransactions();
    const {
        budgets,
        addBudget,
        deleteBudget
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
            <BudgetForm
                addBudget={addBudget}
            />
            <BudgetList
                budgets={budgetProgress}
                deleteBudget={deleteBudget}
            />
            {budgetProgress.map((budget) => (
                <BudgetProgress
                    key={budget.id}
                    budget={budget}
                />
            ))}
        </div>
    );
}

export default Budgets;