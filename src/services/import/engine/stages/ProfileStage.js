import Stage from "../Stage";

import {
    selectProfile
} from "../../mapper/profileRegistry";

/**
 * Detects the best matching import profile.
 */
export default class ProfileStage extends Stage {

    constructor() {

        super("Profile Detection");

    }

    async execute(context) {

        const result =
            selectProfile(
                context.analysis
            );

        context.profile =
            result.profile;

        context.profileConfidence =
            result.confidence;

    }

}