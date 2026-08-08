export function addMissingData(transaction = {}) {

    const fallbackCategory =
        transaction.type === "income"
            ? "otherIncome"
            : "otherExpense";


    return {
        ...transaction,

        date:
            transaction.date ??
            new Date().toISOString(),

        category:
            transaction.category ??
            fallbackCategory,
    };
}