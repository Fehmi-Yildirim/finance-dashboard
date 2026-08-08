import { demoBudgets } from "../../data/demoBudgets";
import { STORAGE_KEYS } from "./storageKeys";

const STORAGE_KEY =
    STORAGE_KEYS.budgets;

const DEMO_KEY =
    STORAGE_KEYS.demoBudgets;

export function normalizeBudget(
    budget = {}
) {
    return {
        ...budget,
    };
}

export function isDemoBudgetMode() {
    const value =
        localStorage.getItem(
            DEMO_KEY
        );

    return (
        value === null ||
        value === "true"
    );
}

export function loadBudgets() {
    try {
        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );

        /*
         * First visit or demo mode:
         * return demo budgets.
         */
        if (
            !saved &&
            isDemoBudgetMode()
        ) {
            return getDemoBudgets();
        }

        if (!saved) {
            return [];
        }

        const parsed =
            JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.map(
            normalizeBudget
        );
    } catch {
        return [];
    }
}

export function saveBudgets(budgets) {
    /*
     * Demo budgets are temporary and
     * must not be saved as user data.
     */
    if (isDemoBudgetMode()) {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(budgets)
    );
}

export function enableBudgetDemoMode() {
    localStorage.removeItem(
        STORAGE_KEY
    );

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
        (budget) => ({
            ...normalizeBudget(budget),
            isDemo: true,
        })
    );
}