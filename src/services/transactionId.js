import { transactionKey } from "./transactionKey";

/**
 * Creates a unique id for a transaction.
 *
 * @param {Object} transaction
 * @param {number} sequence
 * @returns {string}
 */
export function transactionId(
    transaction,
    sequence = 0
) {

    return `${transactionKey(transaction)}#${sequence}`;

}