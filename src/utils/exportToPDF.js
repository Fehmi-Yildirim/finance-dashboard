import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToPDF(transactions) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Finance Dashboard", 14, 20);

    doc.setFontSize(12);
    doc.text(
        `Exportdatum: ${new Date().toLocaleDateString("nl-NL")}`,
        14,
        28
    );

    autoTable(doc, {
        startY: 36,
        head: [[
            "Datum",
            "Omschrijving",
            "Categorie",
            "Type",
            "Bedrag"
        ]],
        body: transactions.map(transaction => [
            new Date(transaction.date).toLocaleDateString("nl-NL"),
            transaction.description,
            transaction.category,
            transaction.type === "income"
                ? "Inkomst"
                : "Uitgave",
            `€ ${transaction.amount.toFixed(2)}`
        ])
    });

    doc.save("transactions.pdf");
}