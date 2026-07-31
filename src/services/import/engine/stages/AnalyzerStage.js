import Stage from "../Stage";

import {
    analyze
} from "../../analyzer/analyzer";

/**
 * Analyzes the parsed document.
 */
export default class AnalyzerStage extends Stage {

    constructor() {

        super("Analyzer");

    }

    async execute(context) {

        const analysis = analyze({

            headers: context.headers,

            rows: context.rows,

            meta: context.meta,

        });

        context.analysis = analysis;

        context.normalizedHeaders =
            analysis.normalizedHeaders;

    }

}