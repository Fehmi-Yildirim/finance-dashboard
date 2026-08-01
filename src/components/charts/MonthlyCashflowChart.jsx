import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";

function MonthlyCashflowChart({ transactions }) {

    const { i18n, t } = useTranslation();

    const monthlyData = useMemo(() => {

        const months = {};

        transactions.forEach((transaction) => {

            const month = new Date(transaction.date)
                .toLocaleString(i18n.language, {
                    month: "short",
                });

            if (!months[month]) {
                months[month] = {
                    month,
                    income: 0,
                    expense: 0,
                };
            }

            if (transaction.type === "income") {
                months[month].income += Number(transaction.amount);
            } else {
                months[month].expense += Number(transaction.amount);
            }

        });

        return Object.values(months);

    }, [transactions, i18n.language]);

    if (monthlyData.length === 0) {
        return (
            <p>{t("reports.noCashflowData")}</p>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                    contentStyle={{
                        backgroundColor: "var(--surface-color)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "8px",
                    }}
                    labelStyle={{
                        color: "var(--text-color)",
                    }}
                    itemStyle={{
                        color: "var(--text-color)",
                    }}
                    formatter={(value) => formatCurrency(value)}
                />

                <Legend />

                <Bar
                    dataKey="income"
                    name={t("reports.income")}
                    fill="#16a34a"
                />

                <Bar
                    dataKey="expense"
                    name={t("reports.expenses")}
                    fill="#dc2626"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default MonthlyCashflowChart;