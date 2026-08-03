import fs from "node:fs";
import path from "node:path";

/**
 * Loads the expected transactions
 * for a fixture.
 *
 * @param {string} name
 * @returns {Object[]}
 */
export function loadGolden(name) {

    const file =
        path.join(
            __dirname,
            "../golden",
            `${name}.json`
        );

    return JSON.parse(
        fs.readFileSync(
            file,
            "utf8"
        )
    );

}