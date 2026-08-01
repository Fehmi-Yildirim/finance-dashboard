import { categoryDefinitions } from "../data/categoryDefinitions";

export function isValidCategory(category) {
    return Boolean(
        categoryDefinitions[category]
    );
}

export function getFallbackCategory(type = "expense") {
    return type === "income"
        ? "otherIncome"
        : "otherExpense";
}

export function normalizeCategory(category, type = "expense") {
    if (isValidCategory(category)) {
        return category;
    }
    return getFallbackCategory(type);
}