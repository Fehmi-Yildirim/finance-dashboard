import { MERCHANT_RULES } from "../rules";
import { buildSearchText } from "../helpers";
import { findMatchingRule } from "../engine/RuleEngine";


export function detectMerchantCategory(transaction) {

    const text =
        buildSearchText(transaction)
            .toLowerCase();


    const rule =
        findMatchingRule(
            text,
            MERCHANT_RULES
        );


    return rule?.category ?? null;
}