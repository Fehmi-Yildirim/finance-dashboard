/**
 * Finds the best matching column based on
 * its detected content.
 *
 * @param {Object} definition
 * @param {Object[]} profiles
 * @returns {Object|null}
 */
export function matchProfile(
    definition,
    profiles
) {

    if (!definition.profile) {
        return null;
    }

    let bestProfile = null;
    let bestScore = 0;

    for (const profile of profiles) {

        let score = 0;

        for (const rule of definition.profile) {

            if (
                matchesRule(
                    profile,
                    rule
                )
            ) {

                score++;

            }

        }

        if (score > bestScore) {

            bestProfile = profile;
            bestScore = score;

        }

    }

    return bestProfile
        ? {
            header: bestProfile.header,
            profileScore: bestScore
        }
        : null;

}

/**
 * Checks whether a column profile matches
 * a single rule.
 *
 * @param {Object} profile
 * @param {Array} rule
 * @returns {boolean}
 */
function matchesRule(
    profile,
    rule
) {

    const [
        property,
        operator,
        expected
    ] = rule;

    const value =
        profile[property];

    switch (operator) {

        case ">=":
            return value >= expected;

        case "<=":
            return value <= expected;

        case ">":
            return value > expected;

        case "<":
            return value < expected;

        case "==":
            return value === expected;

        default:
            return false;

    }

}