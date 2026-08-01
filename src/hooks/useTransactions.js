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
                id: Date.now(),
                isDemo: false,
            }
        ]);
    };

    const importTransactions =
        useCallback(
            (newTransactions) => {
                disableDemoMode();

                const imported =
                    newTransactions.map(
                        normalizeTransaction
                    );

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
                    ? {
                        ...transaction,
                        ...normalizeTransaction(transactionData),
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