import definitions from "../definitions";
import { matchHeader } from "./headerMatcher";
import { profileColumns } from "./columnProfiler";
import { matchProfile } from "./profileMatcher";
import { scoreCandidates } from "./scoreEngine";

/**
 * Creates a complete field mapping.
 *
 * @param {Object} options
 * @returns {Object}
 */
export function autoMap(options) {

    const {
        analysis,
        profile,
        rows,
    } = options;

    const headers =
        analysis.headers;

    const normalizedHeaders =
        analysis.normalizedHeaders;

    const columnProfiles =
        profileColumns(
            rows,
            headers
        );

    const mapping = {};

    for (const definition of definitions) {

        let candidate =
            scoreCandidates(
                matchHeader(
                    definition,
                    headers,
                    normalizedHeaders
                )
            );

        if (!candidate) {

            candidate =
                matchProfile(
                    definition,
                    columnProfiles
                );

        }

        mapping[definition.id] =
            candidate?.header ??
            profile.mapping?.[definition.id] ??
            null;

    }

    return mapping;

}