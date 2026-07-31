export function calculateStatistics(transactions) {

    const incomeTransactions =
        transactions.filter(
            t => t.type === "income"
        );


    const expenseTransactions =
        transactions.filter(
            t => t.type === "expense"
        );


    const income =
        incomeTransactions.reduce(
            (sum, t) =>
                sum + Number(t.amount),
            0
        );


    const expenses =
        expenseTransactions.reduce(
            (sum, t) =>
                sum + Number(t.amount),
            0
        );


    const balance =
        income - expenses;


    const totalTransactions =
        transactions.length;


    const averageExpense =
        expenseTransactions.length === 0
            ? 0
            : expenses / expenseTransactions.length;


    const largestExpense =
        Math.max(
            ...expenseTransactions.map(
                t => Number(t.amount)
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