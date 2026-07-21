import { useMemo } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import { useTranslation } from "react-i18next";

function CategorySummary({ transactions }) {

    const { t } = useTranslation();

    const totals = useMemo(() => {
        return transactions.reduce((accumulator, transaction) => {
            if (transaction.type !== "expense") {
                return accumulator;
            }
            const category = transaction.category;
            accumulator[category] =
                (accumulator[category] ?? 0) +
                Math.abs(transaction.amount);
            return accumulator;
        }, {});
    }, [transactions]);

    const sortedCategories = Object.entries(totals)
        .sort((a, b) => b[1] - a[1]);

    const highestAmount =
        sortedCategories.length > 0
            ? sortedCategories[0][1]
            : 0;

    return (
        <section>
            <h2>{t("categories.title")}</h2>
            <div className="category-summary">
                {sortedCategories.length === 0 ? (
                    <p>{t("categories.noExpenses")}</p>
                ) : (
                    sortedCategories.map(([category, amount]) => {
                        const percentage =
                            highestAmount === 0
                                ? 0
                                : (amount / highestAmount) * 100;
                        return (
                            <div
                                key={category}
                                className="category-item"
                            >
                                <div className="category-header">
                                    <span>
                                        {t(`categories.${category}`)}
                                    </span>
                                    <span>
                                        {formatCurrency(amount)}
                                    </span>
                                </div>
                                <div className="category-bar">
                                    <div
                                        className="category-fill"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default CategorySummary;