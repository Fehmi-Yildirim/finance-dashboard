import { useMemo } from "react";

export function useFilteredTransactions({
    transactions,
    search,
    filter,
    dateFilter,
    startDate,
    endDate,
    sortColumn,
    sortDirection,
}) {


    return useMemo(() => {

        const searchTerm = search.toLowerCase().trim();
        const now = new Date();

        const filtered = transactions.filter((transaction) => {

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
                    (() => {
                        const from = startDate
                            ? new Date(startDate)
                            : null;

                        const to = endDate
                            ? new Date(endDate)
                            : null;

                        if (from) {
                            from.setHours(0, 0, 0, 0);
                        }

                        if (to) {
                            to.setHours(23, 59, 59, 999);
                        }

                        return (
                            (!from || transactionDate >= from) &&
                            (!to || transactionDate <= to)
                        );
                    })()
                );

            const matchesSearch =
                transaction.description.toLowerCase().includes(searchTerm) ||
                Math.abs(transaction.amount).toString().includes(searchTerm);

            const matchesFilter = filter === "all" || transaction.type === filter;

            return (
                matchesSearch &&
                matchesFilter &&
                matchesDate
            );

        });

        return [...filtered].sort((a, b) => {

            let valueA = a[sortColumn];
            let valueB = b[sortColumn];

            if (sortColumn === "date") {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            if (typeof valueA === "string") {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) {
                return sortDirection === "asc"
                    ? -1
                    : 1;
            }

            if (valueA > valueB) {
                return sortDirection === "asc"
                    ? 1
                    : -1;
            }

            return 0;

        });

    }, [
        transactions,
        search,
        filter,
        dateFilter,
        startDate,
        endDate,
        sortColumn,
        sortDirection,
    ]);

}