import { CATEGORY_RULES } from "./categoryRules";


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


    const type = transaction.type;


    let bestMatch = {
        category:
            type === "income"
                ? "otherIncome"
                : "otherExpense",
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


    if (bestMatch.score < 5) {

        return type === "income"
            ? "otherIncome"
            : "otherExpense";

    }


    if (
        type === "income" &&
        bestMatch.category !== "salary"
    ) {

        return "otherIncome";

    }


    return bestMatch.category;

}