/**
 * Converts a transaction into a comparable object
 * for import tests.
 *
 * @param {Object} transaction
 * @returns {Object}
 */
export function toComparable(transaction = {}) {

    return {

        date: transaction.date,
        name: transaction.name,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category

    };

}

/**
 * Converts a list of transactions into
 * comparable objects.
 *
 * @param {Object[]} transactions
 * @returns {Object[]}
 */
export function toComparableList(
    transactions = []
) {

    return transactions.map(
        toComparable
    );

}