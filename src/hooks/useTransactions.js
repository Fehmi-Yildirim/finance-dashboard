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
    const [transactions, setTransactions] =
        useState(
            loadTransactions
        );


    useEffect(() => {
        saveTransactions(
            transactions
        );
    }, [transactions]);

    const statistics =
        useMemo(
            () =>
                calculateStatistics(
                    transactions
                ),
            [
                transactions
            ]
        );

    const recentTransactions =
        useMemo(() => {
            return [
                ...transactions
            ]
                .sort(
                    (a, b) =>
                        new Date(b.date)
                        -
                        new Date(a.date)
                )
                .slice(0, 10);
        }, [transactions]);

    const addTransaction =
        (transaction) => {
            disableDemoMode();
            setTransactions(
                current => [
                    ...current,
                    {
                        ...normalizeTransaction(
                            transaction
                        ),
                        id: Date.now(),
                    }
                ]
            );
        };

    const updateTransaction =
        (
            id,
            transactionData
        ) => {

            disableDemoMode();
            setTransactions(
                current =>
                    current.map(
                        transaction =>
                            transaction.id === id
                                ?
                                {
                                    ...transaction,
                                    ...normalizeTransaction(
                                        transactionData
                                    ),
                                    id:
                                        transaction.id,
                                }
                                :
                                transactio
                    )
            );
        };

    const deleteTransaction =
        (id) => {
            disableDemoMode();
            setTransactions(
                current =>
                    current.filter(
                        transaction =>
                            transaction.id !== id
                    )
            );
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
                    current => [
                        ...current,
                        ...imported,
                    ]
                );
            },
            []
        );

    const clearTransactions =
        () => {
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