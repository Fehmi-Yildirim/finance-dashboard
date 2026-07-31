/**
 * Internal notes field definition.
 * src\services\import\definitions\notes.js
 */
export default {

    id: "notes",
    required: false,

    aliases: [
        "note",
        "notes",
        "mededelingen",
        "omschrijving"
    ],

    profile: [
        ["textCount", ">=", 0.8],
        ["averageLength", ">=", 40]
    ]

};