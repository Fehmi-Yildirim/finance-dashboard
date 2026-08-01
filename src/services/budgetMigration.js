import { migrateCategory } from "./categoryMigration";

export function migrateBudget(budget = {}) {
    return {
        ...budget,
        category:
            migrateCategory(
                budget.category,
                "expense"
            ),
    };
}