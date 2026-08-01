import { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmationDialog from "../common/ConfirmationDialog";
import ActionsDropdown from "../common/ActionsDropdown";
import { formatCurrency } from "../../utils/formatCurrency";

function BudgetList({
    budgets,
    deleteBudget,
    onEdit,
}) {

    const { t } = useTranslation();

    const [selectedBudget, setSelectedBudget] = useState(null);

    const sortedBudgets = [...budgets].sort((a, b) =>
        a.category.localeCompare(b.category)
    );

    if (budgets.length === 0) {
        return (
            <p>
                {t("budgets.noBudgets")}
            </p>
        );
    }

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h3>
                        {t("budgets.listTitle")}
                    </h3>

                    <table className="table table-hover align-middle budget-table">
                        <thead>
                            <tr>
                                <th>{t("transactions.category")}</th>
                                <th>{t("budgets.amount")}</th>
                                <th>{t("budgets.spent")}</th>
                                <th>{t("budgets.remaining")}</th>
                                <th>{t("budgets.status")}</th>
                                <th>
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
                                        <td>
                                            {t(
                                                `categories.${budget.category}`,
                                                {
                                                    defaultValue:
                                                        budget.category.charAt(0).toUpperCase() +
                                                        budget.category.slice(1),
                                                }
                                            )}
                                        </td>
                                        <td>
                                            {formatCurrency(budget.amount)}
                                        </td>
                                        <td>
                                            {formatCurrency(budget.spent)}
                                        </td>
                                        <td>
                                            {formatCurrency(budget.remaining)}
                                        </td>
                                        <td className="text-center">
                                            {status}
                                        </td>
                                        <td>
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
        </>
    );
}

export default BudgetList;