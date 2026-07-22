import TransactionList from "../components/TransactionList";
import Card from "../components/Card";
import Cards from "../components/Cards";
import StatisticsCards from "../components/StatisticsCards";
import CategorySummary from "../components/CategorySummary";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import { useTransactions } from "../hooks/useTransactions";
import { useTranslation } from "react-i18next";

function Dashboard() {

    const { t } = useTranslation();

    const {
        transactions,
        statistics,
        recentTransactions,
    } = useTransactions();

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