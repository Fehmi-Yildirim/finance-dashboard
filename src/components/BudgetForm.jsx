import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";

function BudgetForm({ addBudget }) {

    const { t } = useTranslation();
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !amount) {
            return;
        }
        const newBudget = {
            id: uuidv4(),
            category,
            amount: Number(amount),
            period: "monthly",
        };
        addBudget(newBudget);
        setCategory("");
        setAmount("");
    };
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h3>
                    {t("budgets.addTitle")}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            <strong>
                                {t("budgets.selectCategory")}
                            </strong>
                        </label>
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option value="">
                                {t("budgets.selectCategory")}
                            </option>
                            {categories.expense.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {t(`categories.${item}`, {
                                        defaultValue:
                                            item.charAt(0).toUpperCase() + item.slice(1)
                                    })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            <strong>{t("budgets.amount")}</strong>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        {t("budgets.save")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BudgetForm;