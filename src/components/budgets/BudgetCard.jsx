import { Card, ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/formatCurrency";
import Cards from "../Cards";

function BudgetCard({
    totalBudget,
    totalSpent,
    remaining,
    percentage,
}) {
    const { t } = useTranslation();

    if (totalBudget === 0) {
        return (
            <Cards>
                <Card className="budget-card">
                    <Card.Body>
                        <Card.Title>
                            {t("budgets.overview")}
                        </Card.Title>

                        <p className="budget-empty">
                            {t("budgets.noBudgets")}
                        </p>
                    </Card.Body>
                </Card>
            </Cards>
        );
    }

    const variant =
        percentage >= 100
            ? "danger"
            : percentage >= 80
                ? "warning"
                : "success";

    return (
        <Card className="cards budget-card">
            <Card.Body>
                <Card.Title>
                    {t("budgets.overview")}
                </Card.Title>

                <div className="budget-progress">
                    <ProgressBar
                        now={percentage}
                        label={`${percentage.toFixed(0)}%`}
                        variant={variant}
                    />
                </div>

                <hr />

                <div className="budget-details">
                    <p>
                        <strong>
                            {t("budgets.totalBudget")}
                        </strong>

                        <span>
                            {formatCurrency(totalBudget)}
                        </span>
                    </p>

                    <p>
                        <strong>
                            {t("budgets.spent")}
                        </strong>

                        <span>
                            {formatCurrency(totalSpent)}
                        </span>
                    </p>

                    <p>
                        <strong>
                            {t("budgets.remaining")}
                        </strong>

                        <span>
                            {formatCurrency(remaining)}
                        </span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BudgetCard;