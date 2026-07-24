import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function ConfirmationDialog({
    show,
    onClose,
    onConfirm,
    title,
    message,
    confirmVariant = "danger",
    confirmText,
    cancelText,
}) {
    const { t } = useTranslation();

    const handleConfirm = () => {
        onConfirm?.();
        onClose?.();
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{message}</Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    {cancelText || t("common.cancel")}
                </Button>

                <Button
                    variant={confirmVariant}
                    onClick={handleConfirm}
                >
                    {confirmText || t("common.delete")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationDialog;