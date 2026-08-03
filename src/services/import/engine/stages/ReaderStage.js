import Stage from "../Stage";
import { readCSV, parseCSV } from "../../readers/csvReader";
import * as csvReader from "../../readers/csvReader";


//console.log("CSV READER:", csvReader);
//console.log("CSV READER PATH TEST",import.meta.url);
//console.log( "CSV READER EXPORTS",Object.keys(csvReader));

/**
 * Reads the source document.
 */
export default class ReaderStage extends Stage {

    constructor() {

        super("Reader");

    }

    async execute(context) {

        //console.log("SOURCE TYPE:", typeof context.source, context.source);

        const result =
            typeof context.source === "string"
                ? csvReader.parseCSV(context.source)
                : await csvReader.readCSV(context.source);

        context.rows =
            result.rows;

        context.headers =
            result.headers;

        context.meta =
            result.meta;

    }

}