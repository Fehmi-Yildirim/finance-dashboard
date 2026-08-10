import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AddTransaction from "../transactions/AddTransaction";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function TransactionDrawer({
    open,
    onClose,
    transaction,
    addTransaction,
    updateTransaction,
    initialCategory = null,
}) {
    const { t } = useTranslation();

    const isEditing = !!transaction;

    function handleClose() {
        onClose();
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{
                    width: 450,
                    p: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h5">
                        {isEditing
                            ? t("transactions.edit")
                            : t("transactions.new")}
                    </Typography>

                    <IconButton
                        onClick={handleClose}
                        aria-label={t("common.close")}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <AddTransaction
                    open={open}
                    editingTransaction={transaction}
                    addTransaction={addTransaction}
                    updateTransaction={updateTransaction}
                    initialCategory={initialCategory}
                    onClose={handleClose}
                />
            </Box>
        </Drawer>
    );
}

export default TransactionDrawer;
