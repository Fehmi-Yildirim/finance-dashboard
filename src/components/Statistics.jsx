import Card from "./Card";
import { useTranslation } from "react-i18next";

function Statistics({ statistics }) {

    const { t } = useTranslation();

    return (
        <div className="cards">
            <Card
                title={t("statistics.averageExpense")}
                value={statistics.averageExpense}
            />
            <Card
                title={t("statistics.largestExpense")}
                value={statistics.largestExpense}
            />
            <Card
                title={t("statistics.totalTransactions")}
                value={statistics.totalTransactions}
                isCurrency={false}
            />
        </div>
    );
}

export default Statistics;