/**
 * Returns a mapped value from a CSV row.
 * src\services\import\normalizer\valueExtractor.js
 *
 * @param {Object} row
 * @param {Object} mapping
 * @param {string} field
 * @returns {*}
 */
export function getValue(row, mapping, field) {

    const column = mapping[field]?.column;

    if (!column) {
        return undefined;
    }

    return row[column];

}

/**
 * Returns whether a mapped field exists.
 *
 * @param {Object} mapping
 * @param {string} field
 * @returns {boolean}
 */
export function hasField(mapping, field) {

    return Boolean(mapping[field]?.column);

}