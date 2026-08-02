import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

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

    const confirmButtonRef = useRef(null);

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                confirmButtonRef.current?.focus();
            }, 100);
        }
    }, [show]);

    const handleClose = () => {
        onClose?.();
    };

    const handleConfirm = () => {
        onConfirm?.();
        onClose?.();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {message}
            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    {cancelText || t("common.cancel")}
                </Button>

                <Button
                    ref={confirmButtonRef}
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