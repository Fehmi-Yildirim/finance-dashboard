/**
 * ABN AMRO import profile.
 * src\services\import\profiles\ABNAMRO.js
 */
export default {

    id: "abnamro",
    name: "ABN AMRO",

    supports(analysis) {

        const headers =
            analysis.normalizedHeaders;

        let score = 0;

        if (headers.includes("transaction date")) {
            score += 25;
        }

        if (headers.includes("amount")) {
            score += 25;
        }

        if (headers.includes("description")) {
            score += 25;
        }

        if (headers.includes("account")) {
            score += 25;
        }

        return score;

    },

    mapping: {}

};