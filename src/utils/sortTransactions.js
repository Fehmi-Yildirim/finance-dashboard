export function sortTransactions(
    transactions,
    sortColumn,
    sortDirection,
) {

    return [...transactions].sort((a, b) => {

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

}