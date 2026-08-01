import { transactions as demoTransactions } from "../../data/demoTransactions";
import { addMissingData } from "../../utils/addMissingData";
import detectCategory from "../category/categoryDetector";
import { STORAGE_KEYS } from "./storageKeys";

const STORAGE_KEY =
    STORAGE_KEYS.transactions;

const DEMO_KEY =
    STORAGE_KEYS.demoTransactions;


export function normalizeTransaction(transaction) {

    const withDefaults =
        addMissingData(
            transaction
        );


    return {

        ...withDefaults,

        category:
            transaction.category ??
            detectCategory(
                withDefaults
            ),

    };

}

export function isDemoMode() {

    const value =
        localStorage.getItem(
            DEMO_KEY
        );


    return (
        value === null ||
        value === "true"
    );

}



export function loadTransactions() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (
            !saved &&
            isDemoMode()
        ) {

            return demoTransactions.map(
                normalizeTransaction
            );

        }


        const parsed =
            saved
                ? JSON.parse(saved)
                : [];


        return parsed.map(
            normalizeTransaction
        );


    } catch {

        return demoTransactions.map(
            normalizeTransaction
        );

    }

}




export function saveTransactions(transactions) {


    if (
        isDemoMode()
    ) {

        return;

    }


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            transactions
        )

    );

}

export function enableDemoMode() {

    localStorage.removeItem(
        STORAGE_KEY
    );

    localStorage.setItem(
        DEMO_KEY,
        "true"
    );

}


export function disableDemoMode() {

    localStorage.setItem(
        DEMO_KEY,
        "false"
    );
}


export function getDemoTransactions() {

    return demoTransactions.map(
        normalizeTransaction
    );
}