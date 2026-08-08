import { useEffect, useState } from "react";
import {
    loadBudgets,
    saveBudgets,
    enableBudgetDemoMode,
    disableBudgetDemoMode,
    getDemoBudgets,
    isDemoBudgetMode,
} from "../services/storage/budgetStorage";

export default function useBudgets() {
    const [budgets, setBudgets] = useState(() => {
        const storedBudgets =
            loadBudgets();

        if (
            storedBudgets &&
            storedBudgets.length > 0
        ) {
            return storedBudgets;
        }

        enableBudgetDemoMode();

        return getDemoBudgets();
    });

    useEffect(() => {
        saveBudgets(budgets);
    }, [budgets]);

    const addBudget = (newBudget) => {
        disableBudgetDemoMode();

        setBudgets((currentBudgets) => {
            const existing =
                currentBudgets.find(
                    (budget) =>
                        budget.category ===
                        newBudget.category
                );

            if (existing) {
                return currentBudgets.map(
                    (budget) =>
                        budget.category ===
                            newBudget.category
                            ? {
                                ...budget,
                                amount:
                                    newBudget.amount,
                                isDemo: false,
                            }
                            : budget
                );
            }

            return [
                ...currentBudgets.filter(
                    (budget) =>
                        !budget.isDemo
                ),
                {
                    ...newBudget,
                    id: crypto.randomUUID(),
                    isDemo: false,
                },
            ];
        });
    };

    const updateBudget = (
        updatedBudget
    ) => {
        disableBudgetDemoMode();

        setBudgets((previousBudgets) =>
            previousBudgets.map((budget) =>
                budget.id ===
                    updatedBudget.id
                    ? {
                        ...updatedBudget,
                        isDemo: false,
                    }
                    : budget
            )
        );
    };

    const deleteBudget = (id) => {
        disableBudgetDemoMode();

        setBudgets((previousBudgets) =>
            previousBudgets.filter(
                (budget) =>
                    budget.id !== id
            )
        );
    };

    const clearBudgets = () => {
        enableBudgetDemoMode();

        setBudgets(
            getDemoBudgets()
        );
    };

    const initializeBudgets = (
        categories
    ) => {
        disableBudgetDemoMode();

        setBudgets(
            categories.map((category) => ({
                id: crypto.randomUUID(),
                category,
                amount: 0,
                isDemo: false,
            }))
        );
    };

    return {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
        clearBudgets,
        initializeBudgets,

        // True while demo budgets are active.
        isDemo: isDemoBudgetMode(),
    };
}