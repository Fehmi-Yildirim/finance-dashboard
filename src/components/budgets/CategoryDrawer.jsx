import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../utils/formatCurrency";

function CategoryDrawer({
    open,
    onClose,
    budget,
    transactions = [],
    onTransactionClick,
    onAddTransaction,
}) {
    const { t } = useTranslation();

    if (!budget) {
        return null;
    }

    const categoryTransactions = transactions
        .filter(
            (transaction) =>
                transaction.category === budget.category
        )
        .sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    function handleClose() {
        onClose();
    }

    function handleAddTransaction() {
        onAddTransaction(budget.category);
    }

    const progressColor =
        budget.percentage >= 100
            ? "error"
            : budget.percentage >= 80
                ? "warning"
                : "success";

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
                        {t(
                            `categories.${budget.category}`,
                            {
                                defaultValue:
                                    budget.category,
                            }
                        )}
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

                <Divider sx={{ mb: 2 }} />

                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6">
                            {t("budgets.progress")}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                flexShrink: 0,
                            }}
                        >
                            {budget.percentage.toFixed(0)}%
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={Math.min(
                            budget.percentage,
                            100
                        )}
                        color={progressColor}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                        }}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box className="category-drawer-summary">
                    <Box className="category-drawer-summary-row">
                        <Typography variant="h6">
                            {t("budgets.budget")}
                        </Typography>

                        <Typography>
                            {formatCurrency(
                                budget.amount
                            )}
                        </Typography>
                    </Box>

                    <Box className="category-drawer-summary-row">
                        <Typography variant="h6">
                            {t("budgets.spent")}
                        </Typography>

                        <Typography>
                            {formatCurrency(
                                budget.spent
                            )}
                        </Typography>
                    </Box>

                    <Box className="category-drawer-summary-row">
                        <Typography variant="h6">
                            {t("budgets.remaining")}
                        </Typography>

                        <Typography>
                            {formatCurrency(
                                budget.remaining
                            )}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="h6"
                    sx={{ mb: 2 }}
                >
                    {t("budgets.transactions")}
                </Typography>

                <Box
                    className="category-drawer-actions"
                    sx={{
                        display: "flex",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddTransaction}
                    >
                        {t("transactions.new")}
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleClose}
                    >
                        {t("common.close")}
                    </Button>
                </Box>

                {categoryTransactions.length === 0 ? (
                    <Typography sx={{ mb: 2 }}>
                        {t("budgets.noTransactions")}
                    </Typography>
                ) : (
                    <Box sx={{ mb: 2 }}>
                        {categoryTransactions.map(
                            (transaction) => (
                                <Box
                                    key={transaction.id}
                                    onClick={() =>
                                        onTransactionClick(
                                            transaction
                                        )
                                    }
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key ===
                                            "Enter" ||
                                            event.key ===
                                            " "
                                        ) {
                                            event.preventDefault();

                                            onTransactionClick(
                                                transaction
                                            );
                                        }
                                    }}
                                    className="category-drawer-transaction"
                                >
                                    <Box
                                        className="category-drawer-transaction-info"
                                    >
                                        <Typography
                                            className="category-drawer-transaction-name"
                                        >
                                            {transaction.name ||
                                                transaction.description}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {transaction.date}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        className="category-drawer-transaction-amount"
                                    >
                                        {formatCurrency(
                                            Math.abs(
                                                Number(
                                                    transaction.amount
                                                )
                                            )
                                        )}
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Box>
                )}
            </Box>
        </Drawer>
    );
}

export default CategoryDrawer;