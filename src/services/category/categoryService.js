import { categoryDefinitions } from "../../data/categoryDefinitions";

export function getCategoryDefinition(categoryId) {
    return categoryDefinitions[categoryId] ?? null;
}

export function getCategoryIds(type = null) {

    const income = [];
    const expense = [];

    Object.entries(categoryDefinitions).forEach(
        ([id, definition]) => {

            if (definition.type === "income") {
                income.push(id);
            } else {
                expense.push(id);
            }

        }
    );

    if (type === "income") {
        return income;
    }

    if (type === "expense") {
        return expense;
    }

    return {
        income,
        expense,
    };
}

export function getIncomeCategoryIds() {
    return getCategoryIds("income");
}

export function getExpenseCategoryIds() {
    return getCategoryIds("expense");
}

export function getAllCategories() {
    return Object.entries(categoryDefinitions).map(
        ([id, definition]) => ({
            id,
            translation: `categories.${id}`,
            ...definition,
        })
    );
}

export function isIncomeCategory(categoryId) {
    return categoryDefinitions[categoryId]?.type === "income";
}

export function isExpenseCategory(categoryId) {
    return categoryDefinitions[categoryId]?.type === "expense";
}

export function isValidCategory(categoryId) {
    return Boolean(
        categoryDefinitions[categoryId]
    );
}

export function getFallbackCategory(type = "expense") {
    return type === "income"
        ? "otherIncome"
        : "otherExpense";
}

export function normalizeCategory(category, type = "expense") {
    return isValidCategory(category)
        ? category
        : getFallbackCategory(type);
}