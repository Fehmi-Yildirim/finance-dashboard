import { BANK_RULES } from "../rules";
import { buildSearchText } from "../helpers";
import { findMatchingRule } from "../engine/RuleEngine";


export function detectBankCategory(transaction) {

    const text = `
        ${transaction.name ?? ""}
        ${transaction.description ?? ""}
    `.toLowerCase();


    if (
        text.includes("vatt") ||
        text.includes("vattenfall") ||
        text.includes("eneco") ||
        text.includes("energie")
    ) {
        return "energy";
    }


    return null;
}