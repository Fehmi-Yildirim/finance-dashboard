export function calculateBudgetProgress(
    budgets,
    transactions
) {

    const spentPerCategory = {};

    for (const transaction of transactions) {

        if (transaction.type !== "expense") {
            continue;
        }

        const category =
            transaction.category;

        spentPerCategory[category] =
            (spentPerCategory[category] ?? 0) +
            Math.abs(Number(transaction.amount));

    }

    return budgets.map((budget) => {

        const spent =
            spentPerCategory[
            budget.category
            ] ?? 0;

        const remaining =
            budget.amount - spent;

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