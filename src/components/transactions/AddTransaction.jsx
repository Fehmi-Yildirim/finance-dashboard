import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getCategoryIds } from "../../data/categories";
import { transactionKey } from "../../services/transactionKey";

const categories = getCategoryIds();
const defaultIncomeCategory = categories.income[0];

function AddTransaction({
    addTransaction,
    updateTransaction,
    editingTransaction,
    onClose,
    open,
}) {
    const { t } = useTranslation();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState(defaultIncomeCategory);

    const descriptionInputRef = useRef(null);

    useEffect(() => {
        if (editingTransaction) {
            setDescription(editingTransaction.description);
            setAmount(Math.abs(editingTransaction.amount));
            setType(editingTransaction.type);
            setCategory(editingTransaction.category);
        } else {
            resetForm();
            descriptionInputRef.current?.focus();
        }
    }, [editingTransaction, open]);

    function closeForm() {
        if (onClose) {
            onClose();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!description || !amount) {
            return;
        }

        const value = Math.abs(Number(amount));

        const transactionPayload = {
            description,
            amount: type === "expense" ? -value : value,
            type,
            category,
            date: editingTransaction
                ? editingTransaction.date
                : new Date().toISOString(),
            name: description,
            balance: 0,
            counterparty: {
                name: description,
            },
            notes: "",
        };

        const transactionData = {
            ...transactionPayload,
            id: editingTransaction ? editingTransaction.id : transactionKey(transactionPayload),
        };

        if (editingTransaction) {
            const finalTransaction = { ...editingTransaction, ...transactionData };
            updateTransaction(editingTransaction.id, finalTransaction);
        } else {
            addTransaction(transactionData);
        }

        resetForm();
        closeForm();
    }

    function resetForm() {
        setDescription("");
        setAmount("");
        setType("income");
        setCategory(defaultIncomeCategory);
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
                ref={descriptionInputRef}
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
                            defaultValue: item,
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
                onClick={closeForm}
            >
                {t("common.cancel")}
            </button>

        </form>
    );
}

export default AddTransaction;