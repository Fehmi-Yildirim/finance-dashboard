export function calculateBudgetProgress(budgets, transactions) {
    return budgets.map((budget) => {

        const spent = transactions
            .filter(
                ({ type, category }) =>
                    type === "expense" &&
                    category === budget.category
            )
            .reduce(
                (total, transaction) =>
                    total + Math.abs(Number(transaction.amount)),
                0
            );

        const remaining = budget.amount - spent;

        const percentage =
            budget.amount > 0
                ? (spent / budget.amount) * 100
                : 0;

        return {
            ...budget,
            spent,
            remaining,
            percentage,
        };
    });
}
