export const categories = {
    income: [
        "salary",
        "freelance",
        "bonus",
        "sales",
        "investment",
        "otherIncome",
    ],

    expense: [
        "food",
        "energy",
        "internet",
        "housing",
        "transport",
        "subscriptions",
        "insurance",
        "healthcare",
        "personal",
        "taxes",
        "savings",
        "banking",
        "leisure",
        "health",
        "clothing",
        "otherExpense",
    ],
};

export const allCategories = [
    ...categories.income,
    ...categories.expense,
];
