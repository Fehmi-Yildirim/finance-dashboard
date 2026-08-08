export function buildSearchText(transaction) {
    return [
        transaction.name,
        transaction.description,
        transaction.notes,
        transaction.counterparty?.name,
        transaction.metadata?.merchant?.name,
        transaction.metadata?.bank?.name,
    ]
        .filter(Boolean)
        .join(" ")
        .replace(/[^\w\s]/g, " ")
        .trim()
        .toLowerCase();
}