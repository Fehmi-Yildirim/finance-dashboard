export function calculateBudgetTotals(progress) {

    const totalBudget =
        progress.reduce(
            (sum, budget) => sum + budget.amount,
            0
        );

    const totalSpent =
        progress.reduce(
            (sum, budget) => sum + budget.spent,
            0
        );

    return {
        totalBudget,
        totalSpent,
        remaining:
            totalBudget - totalSpent,
        percentage:
            totalBudget
                ? Math.min(
                    (totalSpent / totalBudget) * 100,
                    100
                )
                : 0
    };
}