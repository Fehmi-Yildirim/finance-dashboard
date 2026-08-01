export function calculateBudgetTotals(progress) {

    const {
        totalBudget,
        totalSpent,
    } = progress.reduce(

        (totals, budget) => {

            totals.totalBudget += budget.amount;
            totals.totalSpent += budget.spent;

            return totals;

        },

        {
            totalBudget: 0,
            totalSpent: 0,
        }

    );

    return {

        totalBudget,

        totalSpent,

        remaining:
            totalBudget - totalSpent,

        percentage:
            totalBudget > 0
                ? Math.min(
                    (totalSpent / totalBudget) * 100,
                    100
                )
                : 0,

    };

}