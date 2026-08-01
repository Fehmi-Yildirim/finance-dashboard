import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCategoryIds } from "../data/categories";

const categories = getCategoryIds();
const defaultIncomeCategory =
    categories.income[0];

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
    const [category, setCategory] = useState(defaultIncomeCategory);

    useEffect(() => {
        if (editingTransaction) {
            setDescription(
                editingTransaction.description
            );
            setAmount(
                Math.abs(
                    editingTransaction.amount
                )
            );
            setType(
                editingTransaction.type
            );
            setCategory(
                editingTransaction.category
            );
        } else {
            resetForm();
        }
    }, [editingTransaction]);

    function handleSubmit(event) {

        event.preventDefault();

        if (!description || !amount) {
            return;
        }

        const value =
            Math.abs(
                Number(amount)
            );


        const transactionData = {

            description,

            amount:
                type === "expense"
                    ? -value
                    : value,

            type,

            category,

        };

        if (editingTransaction) {

            updateTransaction(
                editingTransaction.id,
                transactionData
            );

        } else {

            addTransaction(
                transactionData
            );

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
        setCategory(
            defaultIncomeCategory
        );
    }

    return (
        <form
            className="transaction-form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder={
                    t("transactions.description")
                }
                value={description}
                onChange={({ target }) =>
                    setDescription(
                        target.value
                    )
                }
            />
            <input
                type="number"
                placeholder={
                    t("transactions.amount")
                }
                value={amount}
                onChange={({ target }) =>
                    setAmount(
                        target.value
                    )
                }
            />
            <select
                value={type}
                onChange={({ target }) => {
                    const newType =
                        target.value;
                    setType(newType);
                    setCategory(
                        categories[newType][0]
                    );

                }}
            >
                <option value="income">
                    {
                        t("transactions.income")
                    }
                </option>
                <option value="expense">
                    {
                        t("transactions.expense")
                    }
                </option>
            </select>
            <select
                value={category}
                onChange={({ target }) =>
                    setCategory(
                        target.value
                    )
                }
            >
                {
                    categories[type].map(
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
                                                item,
                                        }
                                    )
                                }
                            </option>
                        )
                    )
                }
            </select>
            <button type="submit">
                {
                    editingTransaction
                        ? t("common.save")
                        : t("common.add")
                }
            </button>
            <button
                type="button"
                onClick={onClose}
            >
                {
                    t("common.cancel")
                }
            </button>
        </form>
    );
}

export default AddTransaction;