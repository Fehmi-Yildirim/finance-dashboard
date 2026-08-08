import {
    createTransaction
}
    from "./transactionFactory";

/**
 * Normalizes imported rows into transactions.
 *
 * @param {Object} options
 * @param {Object[]} options.rows
 * @param {Object} options.mapping
 * @returns {Object[]}
 */
export function normalize(options) {

    const {
        rows = [],
        mapping = {},
    } = options;

    return rows.map(row => {

        const transaction =
            createTransaction(
                row,
                mapping
            );

        return transaction;

    });

}