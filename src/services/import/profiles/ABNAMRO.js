/**
 * ABN AMRO import profile.
 * src\services\import\profiles\ABNAMRO.js
 */
export default {

    id: "abnamro",
    name: "ABN AMRO",

    supports(analysis) {

        const headers = analysis.normalizedHeaders;

        let score = 0;

        if (headers.includes("rekeningnummer")) {
            score += 25;
        }

        if (headers.includes("datum")) {
            score += 20;
        }

        if (headers.includes("bedrag")) {
            score += 25;
        }

        if (headers.includes("omschrijving")) {
            score += 30;
        }

        return score;
    },

    mapping: {
        account: "Rekeningnummer",
        date: "Transactiedatum",
        amount: "Transactiebedrag",
        balance: "Eindsaldo",
        description: "Omschrijving",
        notes: "Omschrijving"
    }

};