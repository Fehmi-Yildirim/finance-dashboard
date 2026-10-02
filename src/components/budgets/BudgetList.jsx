import { useTranslation } from "react-i18next";
import ActionsDropdown from "../common/ActionsDropdown";
import { formatCurrency } from "../../utils/formatCurrency";

function BudgetList({
    budgets,
    deleteBudget,
    onEdit,
    onCategoryClick,
}) {
    const { t } = useTranslation();

    const sortedBudgets = [...budgets].sort((a, b) =>
        a.category.localeCompare(b.category)
    );

    if (budgets.length === 0) {
        return (
            <p className="budget-list-empty">
                {t("budgets.noBudgets")}
            </p>
        );
    }

    return (
        <div className="card shadow-sm budget-list-card">
            <div className="card-body">
                <h3 className="budget-list-title">
                    {t("budgets.listTitle")}
                </h3>

                <div className="budget-table-wrapper">
                    <table className="table table-hover align-middle budget-table">
                        <thead>
                            <tr>
                                <th>
                                    {t("transactions.category")}
                                </th>

                                <th className="text-end">
                                    {t("budgets.amount")}
                                </th>

                                <th className="text-end">
                                    {t("budgets.spent")}
                                </th>

                                <th className="text-end">
                                    {t("budgets.remaining")}
                                </th>

                                <th className="text-center">
                                    {t("budgets.status")}
                                </th>

                                <th className="text-center">
                                    {t("budgets.actions")}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedBudgets.map((budget) => {
                                const status =
                                    budget.remaining < 0
                                        ? "🔴"
                                        : budget.percentage >= 80
                                            ? "🟡"
                                            : "🟢";

                                return (
                                    <tr key={budget.id}>
                                        <td
                                            role="button"
                                            tabIndex={0}
                                            className="budget-category-cell"
                                            onClick={() =>
                                                onCategoryClick(budget)
                                            }
                                            onKeyDown={(event) => {
                                                if (
                                                    event.key === "Enter" ||
                                                    event.key === " "
                                                ) {
                                                    event.preventDefault();
                                                    onCategoryClick(budget);
                                                }
                                            }}
                                        >
                                            {t(
                                                `categories.${budget.category}`,
                                                {
                                                    defaultValue:
                                                        budget.category
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        budget.category.slice(1),
                                                }
                                            )}
                                        </td>

                                        <td className="text-end budget-amount-cell">
                                            {formatCurrency(
                                                budget.amount
                                            )}
                                        </td>

                                        <td className="text-end budget-amount-cell">
                                            {formatCurrency(
                                                budget.spent
                                            )}
                                        </td>

                                        <td className="text-end budget-amount-cell">
                                            {formatCurrency(
                                                budget.remaining
                                            )}
                                        </td>

                                        <td className="text-center budget-status-cell">
                                            <span
                                                role="img"
                                                aria-label={
                                                    budget.remaining < 0
                                                        ? "Over budget"
                                                        : budget.percentage >= 80
                                                            ? "Budget warning"
                                                            : "Budget on track"
                                                }
                                            >
                                                {status}
                                            </span>
                                        </td>

                                        <td className="text-center budget-actions-cell">
                                            <ActionsDropdown
                                                item={budget}
                                                onEdit={onEdit}
                                                onDelete={deleteBudget}
                                                translationKey="budgetActions"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BudgetList;