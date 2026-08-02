import { useState, useEffect, useMemo, useCallback } from "react";
import { calculateStatistics } from "../utils/calculateStatistics";
import {
    loadTransactions,
    saveTransactions,
    enableDemoMode,
    disableDemoMode,
    getDemoTransactions,
    normalizeTransaction,
} from "../services/storage/transactionStorage";


export function useTransactions() {

    const [transactions, setTransactions] = useState(() => {
        const storedTransactions = loadTransactions();

        if (!storedTransactions || storedTransactions.length === 0) {
            enableDemoMode();

            return getDemoTransactions();
        }

        return storedTransactions;
    });


    useEffect(() => {
        saveTransactions(transactions);
    }, [transactions]);


    const statistics = useMemo(
        () => calculateStatistics(transactions),
        [transactions]
    );

    const recentTransactions = useMemo(() => {
        return [...transactions]
            .sort(
                (a, b) =>
                    new Date(b.date) - new Date(a.date)
            )
            .slice(0, 10);
    }, [transactions]);

    const addTransaction = (transaction) => {
        disableDemoMode();

        setTransactions(current => [
            ...current.filter(t => !t.isDemo),
            {
                ...normalizeTransaction(transaction),
                id: crypto.randomUUID(), // Always generate a new unique ID
                isDemo: false,
            }
        ]);
    };

    const importTransactions =
        useCallback(
            (newTransactions) => {
                disableDemoMode();

                const imported = newTransactions.map((t) => {
                    const normalized = normalizeTransaction(t);
                    const value = Math.abs(Number(normalized.amount));
                    return {
                        ...normalized,
                        amount: normalized.type === "expense" ? -value : value,
                        id: crypto.randomUUID(), // Always generate a new unique ID for imported items
                        isDemo: false,
                    };
                });

                setTransactions(
                    imported
                );
            },
            []
        );

    const updateTransaction = (
        id,
        transactionData
    ) => {
        disableDemoMode();

        setTransactions(current =>
            current.map(transaction =>
                transaction.id === id
                    ? { // When updating, keep the original transaction's ID
                        ...transaction,
                        ...normalizeTransaction(transactionData), // Apply normalization
                        id: transaction.id,
                        isDemo: false,
                    }
                    : transaction
            )
        );
    };

    const deleteTransaction = (id) => {
        disableDemoMode();

        setTransactions(current =>
            current.filter(
                transaction =>
                    transaction.id !== id
            )
        );
    };

    const clearTransactions = () => {
        enableDemoMode();

        setTransactions(
            getDemoTransactions()
        );
    };

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