import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getExpenseCategoryIds } from "../../services/category/categoryService";

const expenseCategories = getExpenseCategoryIds();

function BudgetForm({
    editingBudget,
    addBudget,
    updateBudget,
    onClose,
}) {

    const { t } = useTranslation();
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {

        if (editingBudget) {
            setCategory(
                editingBudget.category
            );
            setAmount(
                editingBudget.amount
            );
        } else {
            resetForm();
        }
    }, [editingBudget]);


    function handleSubmit(event) {
        event.preventDefault();

        if (!category || !amount) {
            return;
        }

        const budget = {
            id:
                editingBudget?.id ??
                Date.now(),
            category,
            amount: Number(amount),
        };


        if (editingBudget) {
            updateBudget(
                budget
            );

        } else {
            addBudget(
                budget
            );
        }

        resetForm();
        onClose();
    }


    function resetForm() {
        setCategory("");
        setAmount("");
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="mb-3">
                <label className="form-label">
                    <strong>
                        {
                            t(
                                "budgets.selectCategory"
                            )
                        }
                    </strong>
                </label>
                <select
                    className="form-select"
                    value={category}
                    onChange={({ target }) =>
                        setCategory(
                            target.value
                        )
                    }
                >
                    <option value="">

                        {
                            t(
                                "budgets.selectCategory"
                            )
                        }
                    </option>
                    {
                        expenseCategories.map(
                            (item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {
                                        t(
                                            `categories.${item}`,
                                            {
                                                defaultValue:
                                                    item
                                                        .charAt(0)
                                                        .toUpperCase()
                                                    +
                                                    item.slice(1),
                                            }
                                        )
                                    }

                                </option>
                            )
                        )
                    }
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>
                        {
                            t(
                                "budgets.amount"
                            )
                        }
                    </strong>
                </label>
                <input
                    type="number"
                    className="form-control"
                    value={amount}
                    min="0"
                    step="0.01"
                    onChange={({ target }) =>
                        setAmount(
                            target.value
                        )
                    }
                />
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    {
                        t(
                            "common.cancel"
                        )
                    }
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {
                        editingBudget
                            ? t("common.save")
                            : t("budgets.save")
                    }
                </button>
            </div>
        </form>
    );
}


export default BudgetForm;