export default {

    id: "name",

    aliases: [
        "name",
        "naam",
        "counterparty",
        "beneficiary",
        "begunstigde",
        "tegenpartij",
        "naam / omschrijving",
        "naam ontvanger",
        "naam begunstigde",
        "naam tegenpartij",
        "naam uiteindelijke partij",
        "naam initiërende partij",
        "beneficiary",
        "payee"
    ],

    profile: [
        ["textCount", ">=", 0.8],
        ["averageLength", ">=", 2],
        ["averageLength", "<=", 100]
    ]
};