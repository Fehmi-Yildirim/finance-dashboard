/**
 * Internal description field definition.
 * src\services\import\definitions\description.js
 */
export default {
    id: "description",
    required: true,
    aliases: [
        "description",
        "omschrijving",
        "omschrijving-1",
        "omschrijving-2",
        "omschrijving-3",
        "begunstigde",
        "naam",
        "naam tegenpartij",
        "naam uiteindelijke partij",
        "naam initiërende partij",
        "payee",
        "details",
        "memo",
        "mededelingen"
    ],

    profile: [
        ["textCount", ">=", 0.8],
        ["averageLength", ">=", 15]
    ]
};