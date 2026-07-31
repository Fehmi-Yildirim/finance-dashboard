import Generic from "../profiles/Generic";
import ING from "../profiles/ING";
import Rabobank from "../profiles/Rabobank";
import ABNAMRO from "../profiles/ABNAMRO";

/**
 * Registered import profiles.
 */
const profiles = [
    ING,
    Rabobank,
    ABNAMRO,
    Generic,
];

/**
 * Returns all registered profiles.
 *
 * @returns {Object[]}
 */
export function getProfiles() {

    return profiles;

}

/**
 * Selects the best matching profile.
 *
 * @param {Object} analysis
 * @returns {{
 *   profile: Object,
 *   confidence: number
 * }}
 */
export function selectProfile(analysis) {

    let selected = Generic;

    let confidence = 0;

    for (const profile of profiles) {

        const score =
            profile.supports(analysis);

        if (score > confidence) {

            confidence = score;
            selected = profile;

        }

    }

    return {

        profile: selected,

        confidence,

    };

}