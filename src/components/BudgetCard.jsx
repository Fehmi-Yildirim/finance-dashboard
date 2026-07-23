import { Card, ProgressBar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../utils/formatCurrency";

function BudgetCard({
    totalBudget,
    totalSpent,
    remaining,
    percentage,
}) {

    const { t } = useTranslation();

    if (totalBudget === 0) {
        return (
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Card.Title>
                        💰 {t("budgets.overview")}
                    </Card.Title>
                    <p>
                        {t("budgets.noBudgets")}
                    </p>
                </Card.Body>
            </Card>
        );
    }

    const variant =
        percentage >= 100
            ? "danger"
            : percentage >= 80
                ? "warning"
                : "success";

    return (
        <Card className="cards">
            <Card.Body>
                <Card.Title>
                    {t("budgets.overview")}
                </Card.Title>
                <ProgressBar
                    now={percentage}
                    label={`${percentage.toFixed(0)}%`}
                    variant={variant}
                />
                <hr />
                <p>
                    <strong>
                        {t("budgets.totalBudget")}
                    </strong>
                    {" "}
                    {formatCurrency(totalBudget)}
                </p>
                <p>
                    <strong>
                        {t("budgets.spent")}
                    </strong>
                    {" "}
                    {formatCurrency(totalSpent)}
                </p>
                <p>
                    <strong>
                        {t("budgets.remaining")}
                    </strong>
                    {" "}
                    {formatCurrency(remaining)}
                </p>
            </Card.Body>
        </Card>
    );
}

export default BudgetCard;