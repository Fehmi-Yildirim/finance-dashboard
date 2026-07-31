import Papa from "papaparse";

/**
 * Reads a CSV file.
 *
 * @param {File} file
 * @returns {Promise<Object>}
 */
export function readCSV(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();

        reader.onload = () => {

            const result =
                Papa.parse(reader.result, {

                    header: true,

                    skipEmptyLines: true,

                });

            resolve({

                rows:
                    result.data,

                headers:
                    result.meta.fields ?? [],

                meta:
                    result.meta,

            });

        };

        reader.onerror =
            reject;

        reader.readAsText(file);

    });

}