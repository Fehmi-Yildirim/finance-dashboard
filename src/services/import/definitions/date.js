/**
 * Internal date field definition.
 * src\services\import\definitions\date.js
 */
export default {

    id: "date",

    required: true,

    aliases: [
        "date",
        "datum",
        "boekdatum",
        "booking date",
        "rentedatum",
        "transaction date",
        "value date"
    ],

    patterns: [
        /^\d{8}$/,
        /^\d{4}-\d{2}-\d{2}$/,
        /^\d{2}-\d{2}-\d{4}$/,
        /^\d{2}\/\d{2}\/\d{4}$/
    ],

    profile: [
        ["dateCount", ">=", 0.8]
    ]



};