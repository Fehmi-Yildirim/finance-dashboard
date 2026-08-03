import Stage from "../Stage";
import { autoMap } from "../../mapper/autoMapper";

/**
 * Maps source columns to internal fields.
 */
export default class MappingStage extends Stage {

    constructor() {
        super("Mapping");
    }

    async execute(context) {

        const automaticMapping = autoMap({
            analysis: context.analysis,
            rows: context.rows,
        });


        context.mapping = {
            ...automaticMapping,
            ...(context.profile?.mapping ?? {}),
        };

    }

}