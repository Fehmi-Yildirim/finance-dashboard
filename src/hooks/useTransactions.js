import { useState, useEffect, useMemo, useCallback } from "react";
import { transactions as initialTransactions } from "../data/demoTransactions";
import { addMissingData } from "../utils/addMissingData";
import { calculateStatistics } from "../utils/calculateStatistics";

export function useTransactions() {

    // Returns true when the application is in demo mode.
    // Demo mode is active on the first visit or after the user
    // has cleared all application data.
    const getDemoMode = () => {
        const value = localStorage.getItem("isDemoMode");

        return value === null || value === "true";
    };

    // Load transactions when the application starts.
    const [transactions, setTransactions] = useState(() => {

        try {

            // Retrieve previously saved transactions.
            const savedTransactions =
                localStorage.getItem("transactions");

            // Check whether the application is currently
            // displaying demo data.
            const isDemoMode = getDemoMode();

            // First visit:
            // No saved transactions exist and demo mode is enabled,
            // so display the demo transactions.
            if (
                !savedTransactions &&
                isDemoMode
            ) {
                return initialTransactions.map(addMissingData);
            }

            // Parse the stored transactions.
            // If nothing is stored, start with an empty array.
            const parsed = savedTransactions
                ? JSON.parse(savedTransactions)
                : [];

            // Ensure every transaction contains all required fields.
            return parsed.map(addMissingData);

        } catch {

            // If something goes wrong while reading localStorage,
            // fall back to the demo transactions.
            return initialTransactions.map(addMissingData);

        }

    });

    // Save transactions whenever they change.
    useEffect(() => {

        // Never save the demo transactions.
        // Demo data is only displayed temporarily.
        const isDemoMode =
            localStorage.getItem("isDemoMode");

        if (isDemoMode === "true") {
            return;
        }

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );

    }, [transactions]);

    // Calculate financial statistics.
    // Recalculate only when the transaction list changes.
    const statistics = useMemo(
        () => calculateStatistics(transactions),
        [transactions]
    );

    // Create a list of the 10 most recent transactions.
    const recentTransactions = useMemo(() => {

        return [...transactions]
            .sort(
                (a, b) =>
                    new Date(b.date) - new Date(a.date)
            )
            .slice(0, 10);

    }, [transactions]);

    // Add a new transaction.
    const addTransaction = (transaction) => {

        setTransactions((currentTransactions) => [
            ...currentTransactions,
            {
                // Generate a simple unique id.
                id: Date.now(),

                // Ensure all required fields exist.
                ...addMissingData(transaction),
            },
        ]);

    };

    // Update an existing transaction.
    const updateTransaction = (id, transactionData) => {

        setTransactions((currentTransactions) =>
            currentTransactions.map((transaction) =>
                transaction.id === id
                    ? {
                        ...transaction,
                        ...transactionData,
                    }
                    : transaction
            )
        );

    };

    // Delete a transaction by id.
    const deleteTransaction = (id) => {

        setTransactions((currentTransactions) =>
            currentTransactions.filter(
                (transaction) =>
                    transaction.id !== id
            )
        );

    };

    // Import transactions from a CSV file.
    const importTransactions = useCallback((newTransactions) => {

        // Ensure every imported transaction contains all
        // required fields.
        const imported =
            newTransactions.map(addMissingData);

        // Determine whether the application is still showing
        // the demo transactions.
        const isDemoMode =
            getDemoMode();

        // First CSV import:
        // Replace the demo transactions with the imported data.
        if (isDemoMode) {

            setTransactions(imported);

            // Disable demo mode.
            // Future imports will append instead of replacing.
            localStorage.setItem(
                "isDemoMode",
                "false"
            );

            return;
        }

        // Demo mode is disabled.
        // The user already has real transactions, so append
        // the newly imported transactions.
        setTransactions((current) => [
            ...current,
            ...imported,
        ]);

    }, []);

    // Remove all user data and return to demo mode.
    const clearTransactions = () => {

        // Remove all stored transactions.
        localStorage.removeItem(
            "transactions"
        );

        // Enable demo mode again.
        localStorage.setItem(
            "isDemoMode",
            "true"
        );

        // Immediately display the demo transactions.
        setTransactions(
            initialTransactions.map(addMissingData)
        );

    };

    // Public API of the hook.
    return {
        transactions,
        setTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        importTransactions,
        statistics,
        recentTransactions,
        clearTransactions,
    };
}