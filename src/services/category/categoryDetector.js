import { CATEGORY_RULES } from "./categoryRules";


function detectCategory(transaction) {

    const text = [
        transaction.name,
        transaction.description,
        transaction.notes,
        transaction.counterparty?.name
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    for (const category in CATEGORY_RULES) {
        for (const keyword of CATEGORY_RULES[category]) {
            if (text.includes(keyword)) {
                return category;
            }
        }
    }

    return "otherExpense";
}

export default detectCategory;