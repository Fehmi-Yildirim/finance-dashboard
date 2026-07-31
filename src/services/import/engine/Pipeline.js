/**
 * Executes a sequence of stages.
 * src\services\import\engine\Pipeline.js
 */
export default class Pipeline {

    constructor(stages = []) {

        this.stages = stages;

    }

    /**
     * Executes the pipeline.
     *
     * @param {Object} context
     * @returns {Promise<Object>}
     */
    async execute(context) {

        for (const stage of this.stages) {

            console.group(stage.name);

            await stage.execute(context);

            console.log(JSON.parse(JSON.stringify(context)));
            console.groupEnd();

        }

        return context;

    }
}