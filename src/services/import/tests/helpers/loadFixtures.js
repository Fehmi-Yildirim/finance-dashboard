import fs from "node:fs";
import path from "node:path";

/**
 * Loads all CSV fixtures.
 *
 * @returns {Object[]}
 */
export function loadFixtures() {

    const fixturesDirectory =
        path.join(
            __dirname,
            "../fixtures"
        );

    return fs

        .readdirSync(
            fixturesDirectory
        )

        .filter(
            file =>
                file.endsWith(".csv")
        )

        .sort()

        .map(file => {

            const name =
                path.basename(
                    file,
                    ".csv"
                );

            return {

                name,

                file,

                path:
                    path.join(
                        fixturesDirectory,
                        file
                    ),

                golden:
                    `${name}.json`

            };

        });

}