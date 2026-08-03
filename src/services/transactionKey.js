/**
 * Creates a business key for duplicate detection.
 *
 * @param {Object} transaction
 * @returns {string}
 */
export function transactionKey(transaction) {

    return [

        transaction.date,

        transaction.description
            ?.trim()
            .toLowerCase(),

        Number(transaction.amount)
            .toFixed(2),

        transaction.type

    ].join("|");

}