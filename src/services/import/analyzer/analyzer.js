import { normalizeHeader } from "./helpers";

/**
 * Analyzes parsed tabular data.
 *
 * @param {{
 *   headers: string[],
 *   rows: Object[],
 *   meta: Object
 * }} input
 *
 * @returns {{
 *   delimiter: string,
 *   headers: string[],
 *   normalizedHeaders: string[],
 *   rows: Object[],
 *   meta: Object
 * }}
 */
export function analyze(input) {

    const headers =
        input.headers ?? [];

    return {

        delimiter:
            input.meta?.delimiter ?? ",",

        headers,

        normalizedHeaders:
            headers.map(
                normalizeHeader
            ),

        rows:
            input.rows ?? [],

        meta:
            input.meta ?? {},

    };

}