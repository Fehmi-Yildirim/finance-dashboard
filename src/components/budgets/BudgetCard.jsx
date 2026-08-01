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
                <Card>
                    {t("budgets.overview")}
                    <p>
                        {t("budgets.noBudgets")}
                    </p>
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