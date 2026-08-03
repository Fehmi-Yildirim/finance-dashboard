import Papa from "papaparse";

/**
 * Parses CSV text.
 *
 * @param {string} text
 * @returns {Object}
 */
export function parseCSV(text) {

    const result =
        Papa.parse(
            text,
            {
                header: true,
                skipEmptyLines: true,
            }
        );

    return {

        rows:
            result.data,

        headers:
            result.meta.fields ?? [],

        meta:
            result.meta,

    };

}

/**
 * Reads a browser File as text.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
async function readFileAsText(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload =
            () => resolve(reader.result);

        reader.onerror =
            reject;

        reader.readAsText(file);

    });

}

/**
 * Reads and parses a CSV file.
 *
 * @param {File} file
 * @returns {Promise<Object>}
 */
export async function readCSV(file) {

    const text =
        await readFileAsText(file);

    return parseCSV(text);

}