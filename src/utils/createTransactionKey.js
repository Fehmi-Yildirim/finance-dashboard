/**
 * Creates a unique key for a transaction object to identify duplicates.
 * @param {object} transaction - The transaction object.
 * @returns {string} A unique string key for the transaction.
 */
export function createTransactionKey(transaction) {
    const parts = [
        transaction.date,
        transaction.description?.trim(),
        transaction.amount,
        transaction.type,
    ];
    return parts.join('-').toLowerCase();
}