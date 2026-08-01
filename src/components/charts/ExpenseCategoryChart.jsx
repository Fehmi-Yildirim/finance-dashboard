import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/formatCurrency";

function ExpenseCategoryChart({ transactions }) {

    const { t } = useTranslation();

    const categoryData = useMemo(() => {

        const totals = {};


        transactions
            .filter(transaction => transaction.type === "expense")
            .forEach(transaction => {
                if (!totals[transaction.category]) {
                    totals[transaction.category] = 0;
                }
                totals[transaction.category] += Number(transaction.amount);
            });

        return Object.entries(totals)
            .map(([category, amount]) => ({
                category,
                amount,
            }))
            .sort((a, b) => b.amount - a.amount);

    }, [transactions]);

    if (categoryData.length === 0) {
        return (
            <p>{t("reports.noExpenseData")}</p>
        );
    }

    return (
        <table className="category-table">

            <thead>
                <tr>
                    <th>{t("transactions.category")}</th>
                    <th>{t("reports.amount")}</th>
                </tr>
            </thead>

            <tbody>
                {
                    categoryData.map(item => (
                        <tr key={item.category}>
                            <td>
                                {t(`categories.${item.category}`, {
                                    defaultValue: item.category.charAt(0).toUpperCase() + item.category.slice(1)
                                })}
                            </td>
                            <td>{formatCurrency(item.amount)}</td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    );
}

export default ExpenseCategoryChart;