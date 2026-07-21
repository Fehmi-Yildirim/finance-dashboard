export function calculateStatistics(transactions) {

    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const balance = income - expenses;

    const totalTransactions = transactions.length;

    const expenseTransactions =
        transactions.filter(t => t.amount < 0);

    const averageExpense =
        expenseTransactions.length === 0
            ? 0
            : expenses / expenseTransactions.length;

    const largestExpense =
        Math.max(
            ...expenseTransactions.map(
                t => Math.abs(t.amount)
            ),
            0
        );

    return {
        income,
        expenses,
        balance,
        totalTransactions,
        averageExpense,
        largestExpense,
    };

}