import { useEffect, useState } from "react";
import { migrateBudget } from "../services/budgetMigration";

import {
    loadBudgets,
    saveBudgets,
    enableBudgetDemoMode,
    disableBudgetDemoMode,
    getDemoBudgets,
} from "../services/storage/budgetStorage";

export default function useBudgets() {

    const [budgets, setBudgets] =
        useState(loadBudgets);

    useEffect(() => {
        saveBudgets(budgets);
    }, [budgets]);

    const addBudget = (newBudget) => {

        disableBudgetDemoMode();

        setBudgets((currentBudgets) => {

            const existing =
                currentBudgets.find(
                    (budget) =>
                        budget.category === newBudget.category
                );

            if (existing) {

                return currentBudgets.map((budget) =>
                    budget.category === newBudget.category
                        ? {
                            ...budget,
                            amount: newBudget.amount,
                        }
                        : budget
                );

            }

            return [
                ...currentBudgets,
                migrateBudget({
                    ...newBudget,
                    id: crypto.randomUUID(),
                }),
            ];

        });

    };

    const updateBudget = (updatedBudget) => {

        disableBudgetDemoMode();

        setBudgets((previousBudgets) =>
            previousBudgets.map((budget) =>
                budget.id === updatedBudget.id
                    ? migrateBudget(updatedBudget)
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

    const initializeBudgets = (categories) => {

        disableBudgetDemoMode();

        setBudgets(
            categories.map((category) =>
                migrateBudget({
                    id: crypto.randomUUID(),
                    category,
                    amount: 0,
                })
            )
        );

    };

    return {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
        clearBudgets,
        initializeBudgets,
    };

}