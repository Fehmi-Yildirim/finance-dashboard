/**
 * Rabobank import profile.
 * src\services\import\profiles\Rabobank.js
 */
export default {

    id: "rabobank",
    name: "Rabobank",

    supports(analysis) {

        const headers =
            analysis.normalizedHeaders;

        let score = 0;

        if (headers.includes("iban/bban")) {
            score += 25;
        }

        if (headers.includes("datum")) {
            score += 20;
        }

        if (headers.includes("bedrag")) {
            score += 20;
        }

        if (headers.includes("saldo na trn")) {
            score += 15;
        }

        if (
            headers.includes("naam tegenpartij") ||
            headers.includes("omschrijving-1")
        ) {
            score += 20;
        }

        return score;

    },


    mapping: {
        account: "IBAN/BBAN",
        date: "Datum",
        amount: "Bedrag",
        balance: "Saldo na trn",
        description: "Naam tegenpartij",
        notes: "Omschrijving-1"
    }

};