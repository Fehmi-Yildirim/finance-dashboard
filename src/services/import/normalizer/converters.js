/**
* Converts a CSV amount to a number.
*
* Supports:
*  - 1234.56
*  - 1.234,56
*  - -123,45
*  - +123,45
*
* @param {string|number|null|undefined} value
* @returns {number}
*/
export function convertAmount(value) {

    if (value == null || value === "") {
        return 0;
    }

    let text = String(value)
        .trim()
        .replace(/\s/g, "")
        .replace(/[€$]/, "");

    if (
        text.includes(",") &&
        text.includes(".")
    ) {

        text = text
            .replace(/\./g, "")
            .replace(",", ".");

    }

    else if (text.includes(",")) {

        text =
            text.replace(",", ".");

    }

    return Number(text);

}


/**
 * Converts a date to ISO format.
 *
 * @param {string} value
 * @returns {string}
 */
export function convertDate(value) {

    if (!value) {
        return "";
    }

    const date =
        String(value).trim();


    if (/^\d{8}$/.test(date)) {

        return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`;

    }


    if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {

        const [
            day,
            month,
            year
        ] = date.split("-");


        return `${year}-${month}-${day}`;

    }


    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {

        const [
            day,
            month,
            year
        ] = date.split("/");


        return `${year}-${month}-${day}`;

    }


    return date;

}


/**
 * Converts a value to text.
 *
 * @param {*} value
 * @returns {string}
 */
export function convertText(value) {

    return String(value ?? "")
        .trim();

}


/**
 * Determines the transaction type.
 *
 * The source direction is only used during import.
 * It is not stored in the transaction model.
 *
 * Returns:
 *  - income
 *  - expense
 *
 * @param {number} amount
 * @param {string} sourceDirection
 * @returns {"income"|"expense"}
 */
export function determineType(
    amount,
    sourceDirection = ""
) {

    const value =
        String(sourceDirection)
            .trim()
            .toLowerCase();


    if (
        value === "af" ||
        value === "debit" ||
        value === "outgoing"
    ) {

        return "expense";

    }


    if (
        value === "bij" ||
        value === "credit" ||
        value === "incoming"
    ) {

        return "income";

    }


    return amount < 0
        ? "expense"
        : "income";

}