import ImportEngine
    from "./engine/ImportEngine";

const engine =
    new ImportEngine();

/**
 * Imports a file.
 *
 * @param {File} file
 * @returns {Promise<Object>}
 */
export async function importFile(file) {

    return await engine.import(file);

}