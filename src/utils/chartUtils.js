import { monthFormatter } from "./formatters";

export function getMonthlyIncomeExpenses(transactions) {
    const monthlyData = {};

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date);

        const key = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!monthlyData[key]) {
            monthlyData[key] = {
                label: monthFormatter.format(date),
                income: 0,
                expenses: 0,
            };
        }

        if (transaction.amount > 0) {
            monthlyData[key].income += transaction.amount;
        } else {
            monthlyData[key].expenses += Math.abs(transaction.amount);
        }
    });

    const keys = Object.keys(monthlyData).sort();

    return {
        labels: keys.map((key) => monthlyData[key].label),

        income: keys.map((key) => monthlyData[key].income),

        expenses: keys.map((key) => monthlyData[key].expenses),
    };
}