export function filterTransactions({
    transactions,
    search,
    filter,
    dateFilter,
    startDate,
    endDate,
}) {

    const searchTerm = search.toLowerCase().trim();
    const now = new Date();

    return transactions.filter((transaction) => {

        const transactionDate = new Date(transaction.date);

        const matchesDate =
            dateFilter === "all" ||

            (
                dateFilter === "today" &&
                transactionDate.toDateString() === now.toDateString()
            ) ||

            (
                dateFilter === "month" &&
                transactionDate.getMonth() === now.getMonth() &&
                transactionDate.getFullYear() === now.getFullYear()
            ) ||

            (
                dateFilter === "year" &&
                transactionDate.getFullYear() === now.getFullYear()
            ) ||

            (
                dateFilter === "custom" &&
                (!startDate || transactionDate >= new Date(startDate)) &&
                (!endDate || transactionDate <= new Date(endDate + "T23:59:59"))
            );

        const matchesSearch =
            transaction.description
                .toLowerCase()
                .includes(searchTerm) ||

            Math.abs(transaction.amount)
                .toString()
                .includes(searchTerm);

        const matchesFilter =
            filter === "all" ||
            transaction.type === filter;

        return (
            matchesSearch &&
            matchesFilter &&
            matchesDate
        );

    });

}