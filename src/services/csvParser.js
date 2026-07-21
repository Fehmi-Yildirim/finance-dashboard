import Papa from "papaparse";
import detectCategory from "./categoryDetector.js";

function parseEuropeanAmount(value) {

    if (!value) return 0;

    return Number(
        value
            .replace(",", ".")
            .trim()
    );
}


function convertDate(date) {
    if (!date) {
        return new Date().toISOString();
    }
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`;

}

export function parseCSV(text) {


    // ING CSV reparation
    const fixedText = text
        .replace(/\r/g, "")
        .split("\n")
        .map(line => {

            // ontbrekende quote aan einde regel toevoegen
            if (
                line.includes(",") &&
                !line.endsWith('"')
            ) {
                return line + '"';
            }

            return line;

        })
        .join("\n");


    const result = Papa.parse(fixedText, {
        header: true,
        skipEmptyLines: true,
        delimiter: ",",
        quoteChar: '"',
    });


    return result.data

        .filter(row =>
            row.Datum &&
            row.Begunstigde &&
            row.Bedrag
        )

        .map(row => {

            const amount =
                parseEuropeanAmount(
                    row.Bedrag
                );
            const income =
                row["Af/Bij"] === "Bij";

            return {
                id:
                    crypto.randomUUID(),
                date:
                    convertDate(
                        row.Datum
                    ),
                description:
                    row.Begunstigde?.trim()
                    || "Onbekend",
                amount:
                    income
                        ? amount
                        : -amount,
                type:
                    income
                        ? "income"
                        : "expense",
                category:
                    detectCategory(
                        row.Begunstigde
                    ),


                note:
                    row.Mededelingen?.trim()
                    || "",

                imported:
                    true
            };
        });
}