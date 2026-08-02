import { useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";
import ConfirmationDialog from "./ConfirmationDialog";


function ActionsDropdown({
    item,
    onEdit,
    onDelete,
    translationKey = "common",
}) {

    const { t } = useTranslation();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const toggleRef = useRef(null);

    const removeFocus = () => {
        toggleRef.current?.blur();
    };

    const handleEdit = () => {
        removeFocus();
        onEdit(item);
    };

    const handleDelete = () => {
        removeFocus();
        onDelete(item.id);
        setShowConfirmation(false);
    };

    const openDeleteConfirmation = () => {
        removeFocus();
        setShowConfirmation(true);
    };

    return (
        <>
            <Dropdown align="end">

                <Dropdown.Toggle
                    ref={toggleRef}
                    variant="light"
                    className="action-dropdown"
                >
                    <span className="threedots">
                        ⋮
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>

                    <Dropdown.Item
                        onClick={handleEdit}
                    >
                        {t(`${translationKey}.edit`)}
                    </Dropdown.Item>

                    <Dropdown.Item
                        className="delete-item"
                        onClick={openDeleteConfirmation}
                    >
                        {t(`${translationKey}.delete`)}
                    </Dropdown.Item>

                </Dropdown.Menu>

            </Dropdown>

            <ConfirmationDialog
                show={showConfirmation}
                onClose={() => {
                    removeFocus();
                    setShowConfirmation(false);
                }}
                onConfirm={handleDelete}
                title={t(`${translationKey}.deleteTitle`)}
                message={t(`${translationKey}.deleteMessage`)}
                confirmVariant="danger"
                confirmText={t(`${translationKey}.delete`)}
            />
        </>
    );
}

export default ActionsDropdown;