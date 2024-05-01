import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import dateFormat from "dateformat";
import classNames from "classnames/bind";
import { memo, useContext, useEffect, useState } from "react";
import styles from './TransactionDetail.module.scss'
import currencyFormatter from "@/utils/currencyFormatter";
import { TransactionsPageContext } from "../TransactionsPageProvider";
import { transactionService } from "@/apiServices";
import { AuthContext } from "@/components/AuthProvider";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";

const cx = classNames.bind(styles)

function TransactionDetail({ reloadTransactions }) {

    const { auth } = useContext(AuthContext)
    const [walletName, setWalletName] = useState('')
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
    const showErrorSnackbar = useErrorSnackbar()
    const {
        selectedTransaction,
        listWallets,
        dicCategories,
        setOpenDetail,
        setOpenEditDialog,
        setAddNewTransaction,
    } = useContext(TransactionsPageContext)

    const closeConfirmDeleteDialog = () => setOpenConfirmDeleteDialog(false)

    const deleteTransaction = () => {
        transactionService.deleteTransaction(auth.userId, selectedTransaction.walletId, selectedTransaction.id, auth.accessToken)
            .then(() => {
                setOpenDetail(false)
                reloadTransactions()
            })
            .catch(e => showErrorSnackbar(e.message))
    }

    useEffect(() => {
        if (selectedTransaction) {
            const wallet = listWallets.find(w => w.id === selectedTransaction.walletId)
            if (wallet) {
                setWalletName(wallet.name)
            }
        }
    }, [selectedTransaction])

    return (
        <Stack sx={{ m: 0, p: 0, width: "100%", height: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div>
                    <button className={cx('close-btn')} onClick={() => setOpenDetail(false)}>
                        <CloseIcon sx={{ width: "25px", height: "25px" }} />
                    </button>
                    <Typography variant="div" sx={{ fontWeight: 600, fontSize: "20px" }}>Transaction details</Typography>
                </div>

                <div>
                    <button className={cx('btn', 'delete-btn')}
                        onClick={() => setOpenConfirmDeleteDialog(true)}>Delete</button>
                    <button className={cx('btn', 'edit-btn')} onClick={() => {
                        setOpenEditDialog(true)
                        setAddNewTransaction(false)
                    }}>Edit</button>
                </div>
            </Stack>
            <Divider />
            {
                selectedTransaction && dicCategories[selectedTransaction.categoryId] &&
                <Stack direction="row">
                    <Avatar sx={{ m: "20px 20px 0 50px", width: "56px", height: "56px" }} src={dicCategories[selectedTransaction.categoryId].avatar} />
                    <Stack sx={{ mt: "20px" }}>
                        <Typography sx={{ fontSize: "24px" }}>{dicCategories[selectedTransaction.categoryId].name}</Typography>
                        <Typography sx={{ fontSize: "14px" }}>{walletName}</Typography>
                        <Typography sx={{ fontSize: "12px", mt: "8px", color: "rgb(154,154,154)" }}>{dateFormat(selectedTransaction.date, 'dddd, dd/mm/yyyy')}</Typography>
                        <Divider primary="Inset below" sx={{ width: 150, alignSelf: "start", height: 10, borderBottomWidth: 2 }} />
                        <Typography sx={{ fontSize: "12px", mt: "10px" }}>{selectedTransaction.note}</Typography>
                        <Typography variant="h2"
                            sx={{
                                color: dicCategories[selectedTransaction.categoryId].type > 0 ? "#039be5" : "#e51c23",
                                mt: "5px",
                                fontSize: "40px"
                            }}>
                            {currencyFormatter(selectedTransaction.amount)}
                        </Typography>
                    </Stack>
                </Stack>}
            <Dialog
                open={openConfirmDeleteDialog}
                onClose={closeConfirmDeleteDialog}
                PaperProps={{
                    sx: {
                        width: 600,
                    }
                }}>
                <DialogTitle>
                    {"Confirm delete transaction"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure delete transaction?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={cx('no-btn')} onClick={closeConfirmDeleteDialog} autoFocus>No</Button>
                    <Button className={cx('yes-btn')} onClick={() => {
                        deleteTransaction()
                        closeConfirmDeleteDialog()
                    }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack >
    );
}

export default memo(TransactionDetail);