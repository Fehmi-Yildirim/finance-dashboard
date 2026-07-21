import { useState, useEffect, useMemo, useCallback } from "react";
import { transactions as initialTransactions } from "../data/demoTransactions";
import { addMissingData } from "../utils/addMissingData";
import { calculateStatistics } from "../utils/calculateStatistics";

export function useTransactions() {

    const [transactions, setTransactions] = useState(() => {
        try {
            const savedTransactions =
                localStorage.getItem("transactions");
            const parsed =
                savedTransactions
                    ? JSON.parse(savedTransactions)
                    : initialTransactions;
            return parsed.map(addMissingData);
        } catch {
            return initialTransactions.map(addMissingData);
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
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
        setTransactions((currentTransactions) => [
            ...currentTransactions,
            {
                id: Date.now(),
                ...addMissingData(transaction),
            },
        ]);
    };

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

    const deleteTransaction = (id) => {
        setTransactions((currentTransactions) =>
            currentTransactions.filter(
                (transaction) =>
                    transaction.id !== id
            )
        );
    };

    const importTransactions = useCallback((newTransactions) => {
        setTransactions((current) => [
            ...current,
            ...newTransactions,
        ]);
    }, []);

    const clearAllData = () => {
        localStorage.removeItem("transactions");
        setTransactions([]);
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
        clearAllData,
    };
}