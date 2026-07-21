export function addMissingData(transaction) {
    return {
        ...transaction,
        date: transaction.date ?? new Date().toISOString(),
        category: transaction.category ?? "Overig",
    };
}