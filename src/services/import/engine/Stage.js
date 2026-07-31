/**
 * Base pipeline stage.
 */
export default class Stage {

    constructor(name = "Stage") {

        this.name = name;

    }

    /**
     * Executes the stage.
     *
     * @param {Object} context
     */
    async execute(context) {

        throw new Error(
            `${this.name}.execute() must be implemented.`
        );

    }

}