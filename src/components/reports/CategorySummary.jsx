import { useMemo } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
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

    const sortedCategories = Object.entries(totals).sort(
        (a, b) => b[1] - a[1]
    );

    const highestAmount =
        sortedCategories.length > 0
            ? sortedCategories[0][1]
            : 0;

    return (
        <section className="category-summary-section">
            <h2>{t("categories.title")}</h2>

            <div className="category-summary">
                {sortedCategories.length === 0 ? (
                    <p className="category-summary-empty">
                        {t("categories.noExpenses")}
                    </p>
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
                                    <span className="category-name">
                                        {t(`categories.${category}`)}
                                    </span>

                                    <span className="category-amount">
                                        {formatCurrency(amount)}
                                    </span>
                                </div>

                                <div
                                    className="category-bar"
                                    role="progressbar"
                                    aria-valuenow={Math.round(percentage)}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    aria-label={t(
                                        `categories.${category}`
                                    )}
                                >
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