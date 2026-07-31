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
        context.mapping = autoMap({
            analysis: context.analysis,
            profile: context.profile,
            rows: context.rows,
        });

    }

}