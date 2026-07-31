/**
 * Creates a profile for every column based on its values.
 *
 * @param {Object[]} rows
 * @param {string[]} headers
 * @returns {Object[]}
 */
export function profileColumns(rows = [], headers = []) {

    return headers.map((header) => {

        const values = rows
            .map(row => row[header])
            .filter(value => value !== undefined && value !== null);

        return {

            header,

            sampleSize: values.length,

            emptyCount:
                values.filter(isEmpty).length,

            dateCount:
                values.filter(isDate).length,

            amountCount:
                values.filter(isAmount).length,

            ibanCount:
                values.filter(isIBAN).length,

            directionCount:
                values.filter(isDirection).length,

            numericCount:
                values.filter(isNumeric).length,

            averageLength:
                getAverageLength(values),

        };

    });

}

/**
 * Checks if a value is empty.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isEmpty(value) {

    return String(value).trim() === "";

}

/**
 * Checks whether a value looks like a date.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isDate(value) {

    return /^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}$/.test(
        String(value).trim()
    );

}

/**
 * Checks whether a value looks like a monetary amount.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isAmount(value) {

    return /^-?\d+[.,]\d{2}$/.test(
        String(value).trim()
    );

}

/**
 * Checks whether a value looks like an IBAN.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isIBAN(value) {

    return /^[A-Z]{2}\d{2}[A-Z0-9]{8,30}$/i.test(
        String(value).replace(/\s/g, "")
    );

}

/**
 * Checks whether a value represents a transaction direction.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isDirection(value) {

    const text =
        String(value)
            .trim()
            .toLowerCase();

    return [
        "af",
        "bij",
        "debit",
        "credit",
        "income",
        "expense",
        "incoming",
        "outgoing"
    ].includes(text);

}

/**
 * Checks whether a value is numeric.
 *
 * @param {*} value
 * @returns {boolean}
 */
function isNumeric(value) {

    return !Number.isNaN(
        Number(
            String(value)
                .replace(",", ".")
        )
    );

}

/**
 * Calculates the average text length.
 *
 * @param {Array} values
 * @returns {number}
 */
function getAverageLength(values) {

    if (values.length === 0) {
        return 0;
    }

    const total =
        values.reduce(
            (sum, value) =>
                sum + String(value).trim().length,
            0
        );

    return total / values.length;

}