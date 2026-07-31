/**
 * Finds matching headers for a field definition.
 * src/services/import/mapper/headerMatcher.js
 */

function simplify(text) {

    return String(text ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[()]/g, "")
        .replace(/[\/\\_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}

function compareKey(text) {

    return simplify(text)
        .replace(/\s/g, "");

}

/**
 * Calculates a match score.
 *
 * @param {string} headerKey
 * @param {string} aliasKey
 * @returns {number}
 */
function calculateScore(
    headerKey,
    aliasKey
) {

    // Exact
    if (headerKey === aliasKey) {
        return 100;
    }

    // Starts with
    if (headerKey.startsWith(aliasKey)) {
        return 90;
    }

    // Contains
    if (headerKey.includes(aliasKey)) {
        return 80;
    }

    // Alias contains header
    if (aliasKey.includes(headerKey)) {
        return 70;
    }

    return 0;

}

/**
 * Finds matching headers for a field definition.
 *
 * @param {Object} definition
 * @param {string[]} headers
 * @param {string[]} normalizedHeaders
 * @returns {Object[]}
 */
export function matchHeader(
    definition,
    headers,
    normalizedHeaders
) {

    const matches = [];

    // Longest aliases first
    const aliases =
        [...definition.aliases]
            .sort(
                (a, b) =>
                    b.length - a.length
            );

    for (let index = 0; index < normalizedHeaders.length; index++) {

        const normalized =
            simplify(
                normalizedHeaders[index]
            );

        const headerKey =
            compareKey(normalized);

        let bestScore = 0;

        for (const alias of aliases) {

            const aliasKey =
                compareKey(alias);

            const score =
                calculateScore(
                    headerKey,
                    aliasKey
                );

            if (score > bestScore) {
                bestScore = score;
            }

            if (bestScore === 100) {
                break;
            }

        }

        if (bestScore > 0) {

            matches.push({

                field:
                    definition.id,

                header:
                    headers[index],

                normalized,

                column:
                    index,

                score:
                    bestScore

            });

        }

    }

    return matches;

}