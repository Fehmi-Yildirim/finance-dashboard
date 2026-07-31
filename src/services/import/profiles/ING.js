/**
 * ING import profile.
 */
export default {

    id: "ing",
    name: "ING",

    supports(analysis) {

        const headers =
            analysis.normalizedHeaders;

        let score = 0;

        if (headers.includes("datum")) {
            score += 25;
        }

        if (headers.includes("bedrag")) {
            score += 25;
        }

        if (headers.includes("begunstigde")) {
            score += 25;
        }

        if (headers.includes("af/bij")) {
            score += 25;
        }

        return score;
    },

    mapping: {
        date: "Datum",
        description: "Begunstigde",
        amount: "Bedrag",
        direction: "Af Bij",
        notes: "Mededelingen"
    }

};