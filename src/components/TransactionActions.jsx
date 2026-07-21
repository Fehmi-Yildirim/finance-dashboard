import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function TransactionActions({
    transaction,
    editTransaction,
    deleteTransaction
}) {

    const { t } = useTranslation();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        deleteTransaction(transaction.id);
        setShowConfirm(false);
    };

    return (
        <>
            <Dropdown align="end">
                <Dropdown.Toggle
                    variant="light"
                    className="action-dropdown"
                >
                    <span className="threedots">⋮</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <Dropdown.Item
                        onClick={() => editTransaction(transaction)}
                    >
                        {t("transactionActions.edit")}
                    </Dropdown.Item>

                    <Dropdown.Item
                        className="delete-item"
                        onClick={() => setShowConfirm(true)}
                    >
                        {t("transactionActions.delete")}
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>


            <Modal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("transactionActions.deleteTitle")}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {t("transactionActions.deleteMessage")}
                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirm(false)}
                    >
                        {t("transactionActions.cancel")}
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        {t("transactionActions.delete")}
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TransactionActions;