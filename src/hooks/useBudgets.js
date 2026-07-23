import { useEffect, useState } from "react";

const STORAGE_KEY = "budgets";

export default function useBudgets() {

    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    }, [budgets]);

    const addBudget = (newBudget) => {
        setBudgets((currentBudgets) => {

            const existing = currentBudgets.find(
                (budget) => budget.category === newBudget.category
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

            return [...currentBudgets, newBudget];
        });
    };

    const updateBudget = (updatedBudget) => {
        setBudgets((prev) =>
            prev.map((budget) =>
                budget.id === updatedBudget.id ? updatedBudget : budget
            )
        );
    };

    const deleteBudget = (id) => {
        setBudgets((prev) =>
            prev.filter((budget) => budget.id !== id)
        );
    };

    return {
        budgets,
        addBudget,
        updateBudget,
        deleteBudget,
    };
}