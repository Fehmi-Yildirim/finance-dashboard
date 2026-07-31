import Validator from "./Validator";

import {
    transactionKey
} from "../../transactionKey";

/**
 * Detects duplicate transactions.
 */
export default class DuplicateValidator extends Validator {

    validate({

        transactions,

        existingTransactions = []

    }) {

        const keys = new Set(

            existingTransactions.map(
                transactionKey
            )

        );

        const warnings = [];

        transactions.forEach((transaction, index) => {

            if (keys.has(transactionKey(transaction))) {

                warnings.push({

                    row: index,

                    message: "Duplicate transaction."

                });

            }

        });

        return warnings;

    }

}