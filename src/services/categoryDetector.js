export default function detectCategory(description = "") {
    const text = description.toLowerCase();

    if (
        text.includes("albert") ||
        text.includes("aldi") ||
        text.includes("hema") ||
        text.includes("etos") ||
        text.includes("spar")
    ) {
        return "food";
    }

    if (
        text.includes("eneco") ||
        text.includes("energie")
    ) {
        return "energy";
    }

    if (
        text.includes("ziggo") ||
        text.includes("green isp") ||
        text.includes("t-mobile")
    ) {
        return "internet";
    }

    if (
        text.includes("huur") ||
        text.includes("jansen")
    ) {
        return "housing";
    }

    if (
        text.includes("salaris") ||
        text.includes("werkgever")
    ) {
        return "income";
    }

    if (
        text.includes("ns") ||
        text.includes("trein")
    ) {
        return "transport";
    }

    if (
        text.includes("pathe") ||
        text.includes("muziek") ||
        text.includes("zara") ||
        text.includes("h&m")
    ) {
        return "leisure";
    }

    return "other";
}