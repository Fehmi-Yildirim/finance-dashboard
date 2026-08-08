import {
    detectMerchantCategory,
    detectTextCategory,
} from "./detectors";

export default function detectCategory(transaction) {

    return (
        detectMerchantCategory(transaction)
        ??
        detectTextCategory(transaction)
        ??
        "otherExpense"
    );

}