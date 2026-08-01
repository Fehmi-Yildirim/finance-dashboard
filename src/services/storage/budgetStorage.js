import { demoBudgets } from "../../data/demoBudgets";
import { migrateBudget } from "../budgetMigration";
import { STORAGE_KEYS } from "./storageKeys";

const STORAGE_KEY = STORAGE_KEYS.budgets;
const DEMO_KEY = STORAGE_KEYS.demoBudgets;


export function normalizeBudget(budget = {}) {

    return migrateBudget(
        budget
    );

}

export function isDemoBudgetMode() {
    const value = localStorage.getItem(DEMO_KEY);
    return (
        value === null ||
        value === "true"
    );
}

export function loadBudgets() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return demoBudgets.map(
                normalizeBudget
            );
        }

        const parsed =
            JSON.parse(saved);
        if (
            Array.isArray(parsed) &&
            parsed.length === 0 &&
            isDemoBudgetMode()
        ) {
            return demoBudgets.map(
                normalizeBudget
            );
        }

        return parsed.map(normalizeBudget);

    } catch {
        return demoBudgets.map(
            normalizeBudget
        );

    }
}

export function saveBudgets(budgets) {
    if (isDemoBudgetMode()) {
        return;
    }
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(budgets)
    );
}

export function enableBudgetDemoMode() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(
        DEMO_KEY,
        "true"
    );
}

export function disableBudgetDemoMode() {
    localStorage.setItem(
        DEMO_KEY,
        "false"
    );
}

export function getDemoBudgets() {
    return demoBudgets.map(
        normalizeBudget
    );
}