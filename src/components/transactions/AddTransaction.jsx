import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCategoryIds } from "../../services/category/categoryService";
import { transactionKey } from "../../services/transactionKey";

const categories = getCategoryIds();
const defaultIncomeCategory = categories.income[0];

function AddTransaction({
    addTransaction,
    updateTransaction,
    editingTransaction,
    onClose,
    open,
    initialCategory = null,
}) {
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState(
        defaultIncomeCategory
    );

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (editingTransaction) {
            setName(
                editingTransaction.name || ""
            );

            setDescription(
                editingTransaction.description || ""
            );

            setAmount(
                Math.abs(
                    Number(
                        editingTransaction.amount
                    )
                )
            );

            setType(
                editingTransaction.type || "income"
            );

            setCategory(
                editingTransaction.category ||
                defaultIncomeCategory
            );

            return;
        }

        resetForm();

        if (initialCategory) {
            const categoryType =
                categories.income.includes(
                    initialCategory
                )
                    ? "income"
                    : categories.expense.includes(
                        initialCategory
                    )
                        ? "expense"
                        : "expense";

            setType(categoryType);
            setCategory(initialCategory);
        }

        nameInputRef.current?.focus();
    }, [
        editingTransaction,
        initialCategory,
        open,
    ]);

    function closeForm() {
        if (onClose) {
            onClose();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!amount) {
            return;
        }

        const value = Math.abs(
            Number(amount)
        );

        const transactionPayload = {
            name: name.trim(),
            description: description.trim(),
            amount:
                type === "expense"
                    ? -value
                    : value,
            type,
            category,
            date: editingTransaction
                ? editingTransaction.date
                : new Date().toISOString(),
            balance: 0,
            counterparty: {
                name: name.trim(),
            },
            notes: "",
        };

        const transactionData = {
            ...transactionPayload,
            id: editingTransaction
                ? editingTransaction.id
                : transactionKey(
                    transactionPayload
                ),
        };

        if (editingTransaction) {
            const finalTransaction = {
                ...editingTransaction,
                ...transactionData,
            };

            updateTransaction(
                editingTransaction.id,
                finalTransaction
            );
        } else {
            addTransaction(
                transactionData
            );
        }

        resetForm();
        closeForm();
    }

    function resetForm() {
        setName("");
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
                placeholder={t(
                    "transactions.name"
                )}
                value={name}
                ref={nameInputRef}
                onChange={(event) =>
                    setName(
                        event.target.value
                    )
                }
            />

            <textarea
                placeholder={t(
                    "transactions.description"
                )}
                value={description}
                rows={3}
                onChange={(event) =>
                    setDescription(
                        event.target.value
                    )
                }
            />

            <input
                type="number"
                placeholder={t(
                    "transactions.amount"
                )}
                value={amount}
                onChange={(event) =>
                    setAmount(
                        event.target.value
                    )
                }
            />

            <select
                value={type}
                onChange={(event) => {
                    const newType =
                        event.target.value;

                    setType(newType);
                    setCategory(
                        categories[newType][0]
                    );
                }}
            >
                <option value="income">
                    {t(
                        "transactions.income"
                    )}
                </option>

                <option value="expense">
                    {t(
                        "transactions.expense"
                    )}
                </option>
            </select>

            <select
                value={category}
                onChange={(event) =>
                    setCategory(
                        event.target.value
                    )
                }
            >
                {categories[type].map(
                    (item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {t(
                                `categories.${item}`,
                                {
                                    defaultValue:
                                        item,
                                }
                            )}
                        </option>
                    )
                )}
            </select>

            <div
                className="transaction-form-actions"
            >
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
            </div>
        </form>
    );
}

export default AddTransaction;