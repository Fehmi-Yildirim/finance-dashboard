import { createImportContext } from "./ImportContext";
import { createPipeline } from "./PipelineBuilder";

/**
 * Import engine.
 */
export default class ImportEngine {

    constructor() { this.pipeline = createPipeline(); }

    /**
     * Imports a file.
     * @param {File} source
     * @returns {Promise<Object>}
     */
    async import(source) {
        const context = createImportContext();
        context.source = source;
        return await this.pipeline.execute(context);
    }

}