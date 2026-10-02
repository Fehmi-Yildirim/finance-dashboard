import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BudgetForm from "./BudgetForm";

function BudgetDrawer({
    open,
    onClose,
    budget,
    addBudget,
    updateBudget,
}) {
    const { t } = useTranslation();

    const isEditing = !!budget;

    function handleClose() {
        onClose();
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: "min(450px, 100vw)",
                    maxWidth: "100vw",
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "450px",
                    boxSizing: "border-box",
                    p: {
                        xs: 2,
                        sm: 3,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            minWidth: 0,
                            overflowWrap: "break-word",
                        }}
                    >
                        {isEditing
                            ? t("budgets.editTitle")
                            : t("budgets.addTitle")}
                    </Typography>

                    <IconButton
                        onClick={handleClose}
                        aria-label={t("common.close")}
                        sx={{
                            flexShrink: 0,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider
                    sx={{
                        mb: {
                            xs: 2,
                            sm: 3,
                        },
                    }}
                />

                <BudgetForm
                    editingBudget={budget}
                    addBudget={addBudget}
                    updateBudget={updateBudget}
                    onClose={handleClose}
                />
            </Box>
        </Drawer>
    );
}

export default BudgetDrawer;