export function calculateStatistics(transactions) {

    const statistics =
        transactions.reduce(

            (stats, transaction) => {

                const amount =
                    Number(transaction.amount);

                stats.totalTransactions++;

                if (transaction.type === "income") {

                    stats.income += amount;

                } else {

                    stats.expenses += amount;
                    stats.expenseCount++;

                    if (amount < stats.largestExpense) {
                        stats.largestExpense = amount; // Find the smallest (most negative) value
                    }
                }
                return stats;
            },

            {
                income: 0,
                expenses: 0,
                totalTransactions: 0,
                expenseCount: 0,
                largestExpense: 0,
            }

        );

    return {
        income:
            statistics.income,
        expenses:
            statistics.expenses,
        balance:
            statistics.income + statistics.expenses,
        totalTransactions:
            statistics.totalTransactions,
        averageExpense:
            statistics.expenseCount > 0
                ? statistics.expenses /
                statistics.expenseCount
                : 0,
        largestExpense: Math.abs(statistics.largestExpense),

    };

}