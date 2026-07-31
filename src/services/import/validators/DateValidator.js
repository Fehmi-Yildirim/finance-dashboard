import Validator from "./Validator";

/**
 * Validates transaction dates.
 */
export default class DateValidator extends Validator {

    validate({ transactions }) {

        const errors = [];

        transactions.forEach((transaction, index) => {

            if (Number.isNaN(Date.parse(transaction.date))) {

                errors.push({

                    row: index,

                    field: "date",

                    message: "Invalid date."

                });

            }

        });

        return errors;

    }

}