import ImportEngine from "./engine/ImportEngine";

const engine = new ImportEngine();

/**
 * Imports CSV input.
 *
 * @param {File|string} input
 * @returns {Promise<Object>}
 */
export async function importFile(input) {

    return await engine.import(input);

}