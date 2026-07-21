export function exportToCSV(transactions) {

    const header = "date,description,amount,type,category";

    const csvRows = transactions.map((transaction) => [
        transaction.date,
        `"${transaction.description.replace(/"/g, '""')}"`,
        transaction.amount,
        transaction.type,
        transaction.category,
    ].join(","));

    const csvContent = [header, ...csvRows].join("\n");

    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}