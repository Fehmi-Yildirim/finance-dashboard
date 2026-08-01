export const categories = {

    income: [
        {
            id: "salary",
            translation: "categories.salary",
        },
        {
            id: "freelance",
            translation: "categories.freelance",
        },
        {
            id: "bonus",
            translation: "categories.bonus",
        },
        {
            id: "sales",
            translation: "categories.sales",
        },
        {
            id: "investment",
            translation: "categories.investment",
        },
        {
            id: "otherIncome",
            translation: "categories.otherIncome",
        },
    ],

    expense: [
        {
            id: "food",
            translation: "categories.food",
        },
        {
            id: "housing",
            translation: "categories.housing",
        },
        {
            id: "energy",
            translation: "categories.energy",
        },
        {
            id: "internet",
            translation: "categories.internet",
        },
        {
            id: "transport",
            translation: "categories.transport",
        },
        {
            id: "subscriptions",
            translation: "categories.subscriptions",
        },
        {
            id: "insurance",
            translation: "categories.insurance",
        },
        {
            id: "healthcare",
            translation: "categories.healthcare",
        },
        {
            id: "personal",
            translation: "categories.personal",
        },
        {
            id: "taxes",
            translation: "categories.taxes",
        },
        {
            id: "savings",
            translation: "categories.savings",
        },
        {
            id: "banking",
            translation: "categories.banking",
        },
        {
            id: "leisure",
            translation: "categories.leisure",
        },
        {
            id: "clothing",
            translation: "categories.clothing",
        },
        {
            id: "otherExpense",
            translation: "categories.otherExpense",
        },
    ],
};

export function getCategoryIds(type = null) {

    if (type === "income") {
        return categories.income.map(
            category => category.id
        );
    }

    if (type === "expense") {
        return categories.expense.map(
            category => category.id
        );
    }

    return {
        income:
            categories.income.map(
                category => category.id
            ),
        expense:
            categories.expense.map(
                category => category.id
            ),
    };
}

export function getAllCategories() {
    return [
        ...categories.income,
        ...categories.expense,
    ];
}

export function getExpenseCategoryIds() {
    return categories.expense.map(
        category => category.id
    );
}

export function getIncomeCategoryIds() {
    return categories.income.map(
        category => category.id
    );

}