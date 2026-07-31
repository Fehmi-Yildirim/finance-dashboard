/**
 * Transaction category detection rules.
 */

const CATEGORY_RULES = {

    food: [
        "albert heijn",
        "ahold",
        "aldi",
        "jumbo",
        "lidl",
        "plus",
        "spar",
        "etos",
        "hema",
        "slagerij",
        "bakker",
        "groente",
        "groenten",
        "mcdonald",
        "restaurant",
        "cafetaria",
        "snackbar",
    ],


    healthcare: [
        "zorgverzekering",
        "zorgverzekeraar",
        "zorg premie",
        "premie zorg",
        "zilveren kruis",
        "menzis",
        "cz",
        "vgz",
        "dSW",
        "basisverzekering",
    ],


    personal: [
        "kruidvat",
        "etos",
        "hema",
        "trekpleister",
        "drogist",
        "drogisterij",
    ],


    taxes: [
        "belastingdienst",
        "belasting",
        "toeslag",
        "inkomstenbelasting",
        "gemeente",
        "waterschap",
    ],


    savings: [
        "spaarrekening",
        "sparen",
        "spaargeld",
        "oranje spaar",
        "overboeking sparen",
    ],


    banking: [
        "kosten basispakket",
        "bankkosten",
        "rekeningkosten",
        "servicekosten",
        "pakketkosten",
        "betaalpakket",
    ],


    housing: [
        "huur",
        "huurbetaling",
        "woning",
        "hypotheek",
        "hypotheekbank",
        "vve",
        "servicekosten woning",
    ],


    energy: [
        "eneco",
        "vattenfall",
        "essent",
        "energie",
        "stroom",
        "gas",
        "water",
    ],


    internet: [
        "ziggo",
        "kpn",
        "odido",
        "t-mobile",
        "internet",
        "glasvezel",
    ],


    income: [
        "salaris",
        "loon",
        "werkgever",
        "payroll",
        "uitkering",
        "pensioen",
    ],


    transport: [
        "ns reis",
        "ns groep",
        "nederlandse spoorwegen",
        "ov chipkaart",
        "ov-chipkaart",
        "gvb",
        "arriva",
        "qbuzz",
        "parkeer",
        "parkeren",
        "benzine",
        "tankstation",
    ],


    leisure: [
        "pathe",
        "bioscoop",
        "netflix",
        "spotify",
        "disney",
        "zara",
        "h&m",
        "vakantie",
    ],

};

/**
 * Detects the category of a transaction.
 *
 * @param {Object} transaction
 * @returns {string}
 */
export default function detectCategory(transaction = {}) {

    const text = [
        transaction.name,
        transaction.description,
        transaction.notes,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ");


    let bestMatch = {
        category: "other",
        score: 0,
    };


    for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {

        for (const keyword of keywords) {

            if (text.includes(keyword)) {

                const score = keyword.length;

                if (score > bestMatch.score) {

                    bestMatch = {
                        category,
                        score,
                    };

                }
            }
        }
    }


    // Alleen betrouwbare matches accepteren
    if (bestMatch.score < 5) {
        return "other";
    }


    return bestMatch.category;

}