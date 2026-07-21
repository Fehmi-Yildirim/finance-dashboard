export function transactionKey(transaction) {

    return [
        transaction.date,
        transaction.description
            ?.trim()
            .toLowerCase(),
        Number(transaction.amount)
            .toFixed(2)
    ].join("|");

}