import TransactionList from "../components/TransactionList";
import Card from "../components/Card";
import Cards from "../components/Cards";
import StatisticsCards from "../components/StatisticsCards";
import CategorySummary from "../components/CategorySummary";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import { useTransactions } from "../hooks/useTransactions";
import { useTranslation } from "react-i18next";
import BudgetCard from "../components/budgets/BudgetCard";
import useBudgets from "../hooks/useBudgets";
import { calculateBudgetProgress } from "../utils/calculateBudgetProgress";
import { calculateBudgetTotals } from "../utils/calculateBudgetTotals";


function Dashboard() {

    const { t } = useTranslation();

    const {
        transactions,
        statistics,
        recentTransactions,
    } = useTransactions();

    const { budgets } = useBudgets();

    const budgetProgress =
        calculateBudgetProgress(
            budgets,
            transactions
        );

    const totals =
        calculateBudgetTotals(
            budgetProgress
        );

    return (
        <div>

            <h1>{t("dashboard.title")}</h1>

            <Cards>
                <Card
                    title={t("dashboard.income")}
                    value={statistics.income}
                />
                <Card
                    title={t("dashboard.expenses")}
                    value={statistics.expenses}
                />
                <Card
                    title={t("dashboard.balance")}
                    value={statistics.balance}
                />
            </Cards>

            <BudgetCard
                totalBudget={totals.totalBudget}
                totalSpent={totals.totalSpent}
                remaining={totals.remaining}
                percentage={totals.percentage}
            />

            <StatisticsCards
                statistics={statistics}
            />

            <IncomeExpenseChart
                transactions={transactions}
            />

            <CategorySummary
                transactions={transactions}
            />

            <TransactionList
                title={t("dashboard.recentTransactions")}
                transactions={recentTransactions}
                showActions={false}
                showSorting={false}
            />

        </div>
    );
}

export default Dashboard;