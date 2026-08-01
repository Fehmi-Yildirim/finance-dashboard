import Cards from "../components/Cards";
import Card from "../components/Card";
import ReportSection from "../components/ReportSection";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import { useTransactions } from "../hooks/useTransactions";
import MonthlyCashflowChart from "../components/charts/MonthlyCashflowChart";
import { useTranslation } from "react-i18next";
import StatisticsCards from "../components/StatisticsCards";


function Reports() {

    const { t } = useTranslation();

    const { statistics, transactions } = useTransactions();

    return (
        <div className="reports-page">

            <h1>{t("reports.title")}</h1>

            <Cards>
                <Card
                    title={t("reports.income")}
                    value={statistics.income}
                />
                <Card
                    title={t("reports.expenses")}
                    value={statistics.expenses}
                />
                <Card
                    title={t("reports.balance")}
                    value={statistics.balance}
                />
            </Cards>

            <StatisticsCards
                statistics={statistics}
            />

            <ReportSection
                title={t("reports.expensesByCategory")}
            >
                <ExpenseCategoryChart
                    transactions={transactions}
                />
            </ReportSection>

            <ReportSection
                title={t("reports.monthlyCashflow")}
            >
                <MonthlyCashflowChart
                    transactions={transactions}
                />
            </ReportSection>

        </div>
    );
}

export default Reports;