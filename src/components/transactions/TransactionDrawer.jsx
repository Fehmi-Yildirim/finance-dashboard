import { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AddTransaction from "../transactions/AddTransaction";

function TransactionDrawer({
    open,
    onClose,
    transaction,
    addTransaction,
    updateTransaction,
}) {
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
            <Box sx={{ width: 450, p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {isEditing
                        ? "Bewerken transactie"
                        : "Nieuwe transactie"}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <AddTransaction
                    open={open}
                    editingTransaction={transaction}
                    addTransaction={addTransaction}
                    updateTransaction={updateTransaction}
                    onClose={handleClose}
                />
            </Box>
        </Drawer>
    );
}

export default TransactionDrawer;