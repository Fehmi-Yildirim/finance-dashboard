import { ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/formatCurrency";

function BudgetProgress({
    budget,
    onCategoryClick,
}) {
    const { t } = useTranslation();

    const variant =
        budget.percentage >= 100
            ? "danger"
            : budget.percentage >= 80
                ? "warning"
                : "success";

    return (
        <div
            className="card shadow-sm mb-3 budget-progress-card"
            role="button"
            tabIndex={0}
            onClick={() => onCategoryClick(budget)}
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
            <div className="card-body">
                <h5 className="budget-progress-title">
                    {t(
                        `categories.${budget.category}`,
                        {
                            defaultValue:
                                budget.category,
                        }
                    )}
                </h5>

                <div className="budget-progress-bar">
                    <ProgressBar
                        now={budget.percentage}
                        variant={variant}
                        label={`${budget.percentage.toFixed(0)}%`}
                    />
                </div>

                <div className="budget-progress-details">
                    <p>
                        <strong>
                            {t("budgets.budget")}
                        </strong>

                        <span>
                            {formatCurrency(
                                budget.amount
                            )}
                        </span>
                    </p>

                    <p>
                        <strong>
                            {t("budgets.spent")}
                        </strong>

                        <span>
                            {formatCurrency(
                                budget.spent
                            )}
                        </span>
                    </p>

                    <p>
                        <strong>
                            {t("budgets.remaining")}
                        </strong>

                        <span>
                            {formatCurrency(
                                budget.remaining
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BudgetProgress;