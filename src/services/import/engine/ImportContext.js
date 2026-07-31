/**
 * Creates a new import context.
 *
 * @returns {Object}
 */
export function createImportContext() {

    return {
        source: "",
        rows: [],
        headers: [],
        normalizedHeaders: [],
        profile: null,
        profileConfidence: 0,
        mapping: {},
        transactions: [],
        warnings: [],
        errors: [],
        metadata: {}
    };

}