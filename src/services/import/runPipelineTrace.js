import ImportEngine from "./engine/ImportEngine";

const engine = new ImportEngine();

/**
 * Runs the import pipeline and traces each stage.
 *
 * @param {File} file
 * @returns {Promise<Object>}
 */
export async function runPipelineTrace(file) {

    console.clear();
    console.group("PIPELINE TRACE");

    try {
        const result = await engine.import(file);
        console.log("PROFILE", result.profile);
        console.log("MAPPING", result.mapping);
        console.log("TRANSACTIONS", result.transactions);
        console.log("RESULT", result);
        console.log("ERRORS", result.errors);
        console.log("WARNINGS", result.warnings);
        return result;

    } finally {
        console.groupEnd();
    }

}