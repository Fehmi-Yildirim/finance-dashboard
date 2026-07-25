import { useEffect, useState } from "react";
import { demoBudgets } from "../data/demoBudgets";


const STORAGE_KEY = "budgets";
const DEMO_KEY = "isDemoBudgetMode";

export default function useBudgets() {

    /*
        Initialize budgets:
        1. Check if budgets already exist in localStorage.
        2. Check whether the user is still in demo mode.
        3. On the first visit:
           - no localStorage data
           - no demo mode setting
           => load the demo budgets.
        4. If real user data exists:
           => load that instead.
    */
    const [budgets, setBudgets] = useState(() => {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            const isDemoMode =
                localStorage.getItem(DEMO_KEY);

            if (saved) {

                const parsed =
                    JSON.parse(saved);

                // If localStorage contains an empty array,
                // restore the demo budgets.
                if (
                    Array.isArray(parsed) &&
                    parsed.length === 0 &&
                    (isDemoMode === null || isDemoMode === "true")
                ) {
                    return demoBudgets.map((budget) => ({
                        ...budget,
                    }));
                }
                return parsed;
            }

            // First visit
            return demoBudgets.map((budget) => ({
                ...budget,
            }));

        } catch {

            return demoBudgets.map((budget) => ({
                ...budget,
            }));

        }
    });

    /*
        Automatically persist budgets.
        Demo budgets are not saved again
        while the user remains in demo mode.
    */
    useEffect(() => {

        const isDemoMode =
            localStorage.getItem(DEMO_KEY);

        if (isDemoMode === "true") {
            return;
        }

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(budgets)
        );

    }, [budgets]);

    /*
        Add a new budget.

        As soon as the user makes a change,
        disable demo mode.
    */
    const addBudget = (newBudget) => {

        localStorage.setItem(
            DEMO_KEY,
            "false"
        );

        setBudgets((currentBudgets) => {

            const existing =
                currentBudgets.find(
                    (budget) =>
                        budget.category === newBudget.category
                );

            // Category already exists?
            // Update only the amount.
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

            // Add a new category.
            return [
                ...currentBudgets,
                {
                    ...newBudget,
                    id: Date.now(),
                },
            ];

        });

    };

    /*
        Update an existing budget.
    */
    const updateBudget = (updatedBudget) => {

        localStorage.setItem(
            DEMO_KEY,
            "false"
        );

        setBudgets((previousBudgets) =>
            previousBudgets.map((budget) =>
                budget.id === updatedBudget.id
                    ? updatedBudget
                    : budget
            )
        );
    };

    /*
        Delete a budget.
    */
    const deleteBudget = (id) => {

        localStorage.setItem(
            DEMO_KEY,
            "false"
        );

        setBudgets((previousBudgets) =>
            previousBudgets.filter(
                (budget) =>
                    budget.id !== id
            )
        );

    };

    /*
        Reset budget data.

        Result:
        - remove all user budgets
        - re-enable demo mode
        - reload the demo budgets
    */
    const clearBudgets = () => {

        localStorage.removeItem(
            STORAGE_KEY
        );

        localStorage.setItem(
            DEMO_KEY,
            "true"
        );

        setBudgets(
            demoBudgets.map((budget) => ({
                ...budget,
            }))
        );

    };

    const initializeBudgets = (categories) => {
        const budgets = categories.map((category) => ({
            id: Date.now() + Math.random(),
            category,
            amount: 0,
        }));
        localStorage.setItem(DEMO_KEY, "false");
        setBudgets(budgets);
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