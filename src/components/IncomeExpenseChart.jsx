import { getMonthlyIncomeExpenses } from "../utils/chartUtils";
import { euroFormatter } from "../utils/formatters";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function IncomeExpenseChart({ transactions }) {

    const { t } = useTranslation();

    const {
        labels,
        income,
        expenses,
    } = getMonthlyIncomeExpenses(transactions);

    const hasData = income.some(value => value > 0) || expenses.some(value => value > 0);

    const data = {
        labels,

        datasets: [
            {
                label: t("chart.income"),
                data: income,
                backgroundColor: "#22c55e",
                borderRadius: 6,
            },
            {
                label: t("chart.expenses"),
                data: expenses,
                backgroundColor: "#ef4444",
                borderRadius: 6,
            },
        ],
    };

    const isDarkMode = document.documentElement.classList.contains("dark-mode");

    const textColor = isDarkMode ? "#ffffff" : "#374151";
    const gridColor = isDarkMode
        ? "rgba(255,255,255,0.2)"
        : "#eeeeee";

    const options = {
        responsive: true,

        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: textColor,
                },
            },

            tooltip: {
                callbacks: {
                    label(context) {
                        return `${context.dataset.label}: ${euroFormatter.format(context.raw)}`;
                    },
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: textColor,
                },

                grid: {
                    display: false,
                },
            },

            y: {
                ticks: {
                    color: textColor,
                    callback(value) {
                        return euroFormatter.format(value);
                    },
                },

                grid: {
                    color: gridColor,
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>
                {t("chart.title")}
            </h2>
            {hasData ? (
                <Bar
                    data={data}
                    options={options}
                />
            ) : (
                <p>
                    {t("chart.noData")}
                </p>
            )}
        </div>
    );
}

export default IncomeExpenseChart;