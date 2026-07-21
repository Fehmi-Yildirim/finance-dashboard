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
