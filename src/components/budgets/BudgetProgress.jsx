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
            className="card shadow-sm mb-3"
            role="button"
            tabIndex={0}
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
            style={{
                cursor: "pointer",
            }}
        >
            <div className="card-body">
                <h5>
                    {t(
                        `categories.${budget.category}`,
                        {
                            defaultValue:
                                budget.category,
                        }
                    )}
                </h5>

                <ProgressBar
                    now={budget.percentage}
                    variant={variant}
                    label={`${budget.percentage.toFixed(
                        0
                    )}%`}
                />

                <div className="mt-3">
                    <p>
                        <strong>
                            {t("budgets.budget")}
                        </strong>{" "}
                        {formatCurrency(
                            budget.amount
                        )}
                    </p>

                    <p>
                        <strong>
                            {t("budgets.spent")}
                        </strong>{" "}
                        {formatCurrency(
                            budget.spent
                        )}
                    </p>

                    <p>
                        <strong>
                            {t(
                                "budgets.remaining"
                            )}
                        </strong>{" "}
                        {formatCurrency(
                            budget.remaining
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BudgetProgress;