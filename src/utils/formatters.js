export const euroFormatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

export const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
});

export const monthFormatter = new Intl.DateTimeFormat("nl-NL", {
    month: "short",
    year: "numeric",
});