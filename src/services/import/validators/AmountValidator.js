import Validator from "./Validator";

/**
 * Validates transaction amounts.
 */
export default class AmountValidator extends Validator {

    validate({ transactions }) {

        const errors = [];

        transactions.forEach((transaction, index) => {

            if (Number.isNaN(Number(transaction.amount))) {

                errors.push({

                    row: index,

                    field: "amount",

                    message: "Invalid amount."

                });

            }

        });

        return errors;

    }

}