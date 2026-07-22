import Card from "./Card";
import Cards from "./Cards";
import { useTranslation } from "react-i18next";

function Statistics({ statistics }) {

    const { t } = useTranslation();

    return (
        <Cards>
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
        </Cards>
    );
}

export default Statistics;