import { TEXT_RULES } from "../rules";
import { buildSearchText } from "../helpers";
import { findMatchingRule } from "../engine/RuleEngine";


export function detectTextCategory(transaction) {

    const text =
        buildSearchText(transaction)
            .toLowerCase();


    const rule =
        findMatchingRule(
            text,
            TEXT_RULES
        );


    return rule?.category ?? null;
}