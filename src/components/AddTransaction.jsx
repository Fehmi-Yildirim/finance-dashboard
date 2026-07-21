import { useEffect, useState } from "react";
import { categories } from "../data/categories";
import { useTranslation } from "react-i18next";

function AddTransaction({
    addTransaction,
    updateTransaction,
    editingTransaction,
    onClose,
}) {

    const { t } = useTranslation();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState(categories.income[0]);

    useEffect(() => {
        if (editingTransaction) {
            setDescription(editingTransaction.description);
            setAmount(Math.abs(editingTransaction.amount));
            setType(editingTransaction.type);
            setCategory(editingTransaction.category);
        } else {
            setDescription("");
            setAmount("");
            setType("income");
            setCategory(categories.income[0]);
        }
    }, [editingTransaction]);

    function handleSubmit(event) {
        event.preventDefault();
        if (!description || !amount) {
            return;
        }
        const transactionData = {
            description,
            amount:
                type === "expense"
                    ? -Math.abs(Number(amount))
                    : Math.abs(Number(amount)),
            type,
            category,
        };

        if (editingTransaction) {
            updateTransaction(
                editingTransaction.id,
                transactionData
            );
        } else {
            addTransaction(transactionData);
        }

        resetForm();

        if (onClose) {
            onClose();
        }

    }

    function resetForm() {
        setDescription("");
        setAmount("");
        setType("income");
        setCategory(categories.income[0]);
    }

    return (
        <form
            className="transaction-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder={t("transactions.description")}
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
            />

            <input
                type="number"
                placeholder={t("transactions.amount")}
                value={amount}
                onChange={(event) =>
                    setAmount(event.target.value)
                }
            />

            <select
                value={type}
                onChange={(event) => {
                    const newType = event.target.value;
                    setType(newType);
                    setCategory(categories[newType][0]);
                }}
            >
                <option value="income">
                    {t("transactions.income")}
                </option>

                <option value="expense">
                    {t("transactions.expense")}
                </option>
            </select>

            <select
                value={category}
                onChange={(event) =>
                    setCategory(event.target.value)
                }
            >
                {categories[type].map((item) => (
                    <option
                        key={item}
                        value={item}
                    >
                        {t(`categories.${item}`, {
                            defaultValue: item
                        })}
                    </option>
                ))}
            </select>
            <button type="submit">
                {editingTransaction
                    ? t("common.save")
                    : t("common.add")}
            </button>

            <button
                type="button"
                onClick={onClose}
            >
                {t("common.cancel")}
            </button>
        </form>
    );
}

export default AddTransaction;