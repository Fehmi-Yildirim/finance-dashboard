/**
 * ING import profile.
 */
export default {

    id: "ing",
    name: "ING",

    supports(analysis) {

        const headers = analysis.normalizedHeaders;

        let score = 0;

        if (headers.includes("datum")) {
            score += 25;
        }

        if (headers.includes("bedrag eur")) {
            score += 25;
        }

        if (headers.includes("naam omschrijving")) {
            score += 25;
        }

        if (headers.includes("af bij")) {
            score += 25;
        }

        return score;
    },


    mapping: {

        date: "Datum",
        name: "Naam / Omschrijving",
        description: "Mededelingen",
        amount: "Bedrag (EUR)",
        direction: "Af Bij",
        notes: "Mededelingen"

    }

};