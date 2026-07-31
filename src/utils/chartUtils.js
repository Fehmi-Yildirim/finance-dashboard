import { monthFormatter } from "./formatters";

export function getMonthlyIncomeExpenses(transactions) {

    const monthlyData = {};


    transactions.forEach((transaction) => {

        // Skip transactions without valid dates
        if (!transaction.date) {
            return;
        }


        const date =
            new Date(transaction.date);


        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;


        if (!monthlyData[key]) {

            monthlyData[key] = {

                label:
                    monthFormatter.format(date),

                income: 0,

                expenses: 0,

            };

        }


        const amount =
            Number(transaction.amount);


        if (transaction.type === "income") {

            monthlyData[key].income += amount;

        }


        if (transaction.type === "expense") {

            monthlyData[key].expenses += amount;

        }

    });


    const keys =
        Object.keys(monthlyData)
            .sort();


    return {

        labels:
            keys.map(
                key => monthlyData[key].label
            ),


        income:
            keys.map(
                key => monthlyData[key].income
            ),


        expenses:
            keys.map(
                key => monthlyData[key].expenses
            ),

    };

}