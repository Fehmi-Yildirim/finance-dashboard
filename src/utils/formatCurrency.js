export function formatCurrency(amount) {
    return new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
    }).format(amount);
}