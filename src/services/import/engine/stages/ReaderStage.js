import Stage from "../Stage";
import { readCSV } from "../../readers/csvReader";

/**
 * Reads the source document.
 */
export default class ReaderStage extends Stage {

    constructor() {

        super("Reader");

    }

    async execute(context) {

        const result =
            await readCSV(
                context.source
            );

        context.rows =
            result.rows;

        context.headers =
            result.headers;

        context.meta =
            result.meta;

    }

}