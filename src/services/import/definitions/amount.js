/**
 * Internal amount field definition.
 * src/services/import/definitions/amount.js
 */
export default {

    id: "amount",

    required: true,

    aliases: [
        "bedrag",
        "bedrag (eur)",
        "bedrag eur",
        "mutatiebedrag",
        "value",
        "credit",
        "debit",
        "amount",
        "amount eur"
    ],

    patterns: [
        /^-?\d+[.,]\d{2}$/,
        /^-?\d+\.\d{3},\d{2}$/
    ],

    profile: [
        ["amountCount", ">=", 0.8],
        ["averageLength", "<=", 20]
    ]

};