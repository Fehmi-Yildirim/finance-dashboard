import Stage from "../Stage";

import ValidationEngine
    from "../../validators/ValidationEngine";

/**
 * Validates normalized transactions.
 */
export default class ValidationStage extends Stage {

    constructor() {

        super("Validation");

        this.engine =
            new ValidationEngine();

    }

    async execute(context) {

        context.validation =
            this.engine.validate({

                transactions:
                    context.transactions,

                existingTransactions:
                    context.existingTransactions ?? [],

            });

    }

}