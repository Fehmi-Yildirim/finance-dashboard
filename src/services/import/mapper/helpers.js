/**
 * Returns all values for a column.
 *
 * @param {Object[]} rows
 * @param {string} column
 * @returns {string[]}
 */
export function getColumnValues(rows, column) {

    return rows.map(row => row[column]);

}