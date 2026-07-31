/**
 * Normalizes a column header to simplify matching.
 *
 * @param {string} header
 * @returns {string}
 */
export function normalizeHeader(header) {

    return String(header ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[()]/g, "")
        .replace(/[/_-]/g, " ")
        .replace(/\s+/g, " ");

}