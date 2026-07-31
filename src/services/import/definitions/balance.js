/**
 * Internal balance field definition.
 * src/services/import/definitions/balance.js
 */
export default {

    id: "balance",

    required: false,

    aliases: [
        "saldo",
        "balance",
        "saldo na trn",
        "balance after transaction",
        "running balance"
    ],

    profile: [
        ["amountCount", ">=", 0.8],
        ["numericCount", ">=", 0.8]
    ]

};