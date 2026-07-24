import { useState } from "react";
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

    const handleDelete = () => {
        onDelete(item.id);
        setShowConfirmation(false);
    };

    return (
        <>
            <Dropdown align="end">

                <Dropdown.Toggle
                    variant="light"
                    className="action-dropdown"
                >
                    <span className="threedots">
                        ⋮
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => onEdit(item)}
                    >
                        {t(`${translationKey}.edit`)}
                    </Dropdown.Item>

                    <Dropdown.Item
                        className="delete-item"
                        onClick={() =>
                            setShowConfirmation(true)
                        }
                    >
                        {t(`${translationKey}.delete`)}
                    </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>


            <ConfirmationDialog
                show={showConfirmation}
                onClose={() =>
                    setShowConfirmation(false)
                }
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