import {

    createValidationResult

}
    from "./ValidationResult";

import RequiredValidator
    from "./RequiredValidator";

import AmountValidator
    from "./AmountValidator";

import DateValidator
    from "./DateValidator";

import DuplicateValidator
    from "./DuplicateValidator";

/**
 * Runs all validators.
 */
export default class ValidationEngine {

    constructor() {

        this.validators = [

            new RequiredValidator(),

            new AmountValidator(),

            new DateValidator(),

            new DuplicateValidator(),

        ];

    }

    validate(context) {

        const result =
            createValidationResult();

        for (const validator of this.validators) {

            const issues =
                validator.validate(context);

            if (!issues.length) {
                continue;
            }

            if (validator instanceof DuplicateValidator) {

                result.warnings.push(...issues);

            }
            else {

                result.errors.push(...issues);

            }

        }

        result.valid =
            result.errors.length === 0;

        return result;

    }

}