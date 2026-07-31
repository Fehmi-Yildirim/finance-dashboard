/**
 * Internal transaction direction field definition.
 * src\services\import\definitions\direction.js
 */
export default {

    id: "direction",
    required: false,

    aliases: [
        // Dutch
        "af bij",
        "af/bij",
        "bij af",
        "debit credit",
        "credit",
        "debit",
        "transaction type",
        "dc",
        "dr cr",
        "bij",
        "af",
        // English
        "debit credit",
        "credit debit",
        "debit",
        "credit",
        "direction",
        "transaction direction",
        "transaction type",
        "booking type"
    ],

    profile: [
        ["directionCount", ">=", 0.8],
        ["uniqueCount", "<=", 5]
    ]

};