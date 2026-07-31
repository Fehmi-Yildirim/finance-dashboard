import Stage from "../Stage";

import {
    normalize
} from "../../normalizer";

/**
 * Converts imported rows into transactions.
 * src\services\import\engine\stages\NormalizerStage.js
 */
export default class NormalizerStage extends Stage {

    constructor() {

        super("Normalization");

    }

    async execute(context) {

        context.transactions =
            normalize({

                rows:
                    context.rows,

                mapping:
                    context.mapping,

            });

    }

}