/**
 * Internal account field definition.
 * src/services/import/definitions/account.js
 */
export default {

    id: "account",

    required: false,

    aliases: [
        "rekening",
        "iban",
        "account",
        "account number"
    ],

    profile: [
        ["ibanCount", ">=", 0.8]
    ]

};