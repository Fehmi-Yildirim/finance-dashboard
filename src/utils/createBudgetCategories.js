export function createBudgetCategories(transactions) {

    return [
        ...new Set(
            transactions
                .filter(
                    (transaction) =>
                        transaction.type === "expense"
                )
                .map(
                    (transaction) => transaction.category
                )
        ),
    ];

}