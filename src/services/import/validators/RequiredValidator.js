import Validator from "./Validator";

/**
 * Checks required transaction fields.
 * src\services\import\validators\RequiredValidator.js
 */
export default class RequiredValidator extends Validator {

    validate({ transactions }) {

        const errors = [];

        transactions.forEach((transaction, index) => {

            if (!transaction.date) {

                errors.push({

                    row: index,

                    field: "date",

                    message: "Missing date."

                });

            }


            if (
                transaction.amount === null ||
                transaction.amount === undefined
            ) {

                errors.push({

                    row: index,

                    field: "amount",

                    message: "Missing amount."

                });

            }

        });


        return errors;

    }

}