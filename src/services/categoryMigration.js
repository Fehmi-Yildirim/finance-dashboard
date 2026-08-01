import { normalizeCategory } from "./categoryService";

const CATEGORY_ALIASES = {
    rent: "housing",
    groceries: "food",
    health: "healthcare",
    other: "otherExpense",
    income: "salary",
    fixed_costs: "housing",
    Overig: "otherExpense",
};

export function migrateCategory(
    category,
    type
) {
    const mapped = CATEGORY_ALIASES[category];
    return normalizeCategory(mapped ?? category, type);
}