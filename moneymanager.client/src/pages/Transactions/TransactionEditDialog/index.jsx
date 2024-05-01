import { Avatar, Dialog, DialogContent, DialogTitle, Stack, Typography, InputBase, Button, DialogActions } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from "dayjs";
import classNames from "classnames/bind";
import { memo, useContext, useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import styles from "./TransactionEditDialog.module.scss"
import { GUID_EMPTY, CURRENCY_UNIT } from '@/utils/constants'
import WalletSelectionDialog from "../WalletSelectionDialog";
import CategorySelectionDialog from "../CategorySelectionDialog";
import DatePickerDialog from "@/components/DatePickerDialog";
import { transactionService } from "@/apiServices"
import { TransactionsPageContext } from "../TransactionsPageProvider/index";
import { AuthContext } from "@/components/AuthProvider";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";

const cx = classNames.bind(styles)

function TransactionEditDialog({ reloadTransactions }) {

    const { auth } = useContext(AuthContext)
    const [openWalletSelectionDialog, setOpenWalletSelectionDialog] = useState(false)
    const [openCategorySelectionDialog, setOpenCategorySelectionDialog] = useState(false)
    const [openDatePickerDialog, setOpenDatePickerDialog] = useState(false)
    const [selectedEditWallet, setSelectedEditWallet] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [amount, setAmount] = useState(null)
    const [date, setDate] = useState(dayjs());
    const [note, setNote] = useState('')
    const [enableToSave, setEnableToSave] = useState(false)
    const {
        listWallets,
        dicCategories,
        selectedTransaction,
        selectedWallet,
        openEditDialog,
        setOpenEditDialog,
        setOpenDetail,
        addNewTransaction
    } = useContext(TransactionsPageContext)
    const showErrorSnackbar = useErrorSnackbar()

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpenEditDialog(false);
    }

    const handleSavingChange = () => {
        if (addNewTransaction) {
            const transactionForCreation = {
                date: date,
                amount: selectedCategory.type > 0 ? amount : - amount,
                note: note,
                categoryId: selectedCategory.id,
                transferredUserId: null,
                transferredWalletId: null
            }
            transactionService.createNewTransaction(auth.userId, selectedEditWallet.id, transactionForCreation, auth.accessToken)
                .then(() => reloadTransactions())
                .catch(e => showErrorSnackbar(e.message))
        }
        else {
            const transactionForUpdate = {
                date: date,
                amount: selectedCategory.type > 0 ? Math.abs(amount) : - Math.abs(amount),
                note: note,
                categoryId: selectedCategory.id,
            }
            transactionService.updateTransaction(auth.userId, selectedTransaction.walletId, selectedTransaction.id, transactionForUpdate, auth.accessToken)
                .then(() => reloadTransactions())
                .catch(e => showErrorSnackbar(e.message))
        }
    }

    useEffect(() => {
        if (openEditDialog && listWallets && selectedWallet) {
            if (addNewTransaction) {
                if (selectedWallet.id === GUID_EMPTY) {
                    setSelectedEditWallet(null)
                } else {
                    setSelectedEditWallet(selectedWallet)
                }
            } else {
                if (selectedTransaction) {
                    const selectedWallet = listWallets.find(w => w.id === selectedTransaction.walletId)
                    setSelectedEditWallet(selectedWallet)
                }
            }
        }
    }, [listWallets, selectedWallet, selectedTransaction, openEditDialog])

    useEffect(() => {
        if (openEditDialog) {
            if (!addNewTransaction && selectedTransaction && dicCategories) {
                setSelectedCategory(dicCategories[selectedTransaction.categoryId])
            } else {
                setSelectedCategory(null)
            }
        }
    }, [selectedTransaction, dicCategories, openEditDialog])

    useEffect(() => {
        if (openEditDialog) {
            if (!addNewTransaction && selectedTransaction) {
                setAmount(Math.abs(selectedTransaction.amount))
                setDate(dayjs(selectedTransaction.date))
                setNote(selectedTransaction.note)
            }
            else {
                setAmount(null)
                setDate(dayjs())
                setNote('')
            }
        }
    }, [selectedTransaction, openEditDialog])

    useEffect(() => {
        setEnableToSave(selectedEditWallet && selectedCategory && amount && amount != 0)
    }, [selectedEditWallet, selectedCategory, amount, openEditDialog])

    return (

        <Dialog open={openEditDialog} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 1008,
                    maxHeight: 362
                }
            }}>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                {addNewTransaction ? "Add transaction" : "Edit transaction"}
            </DialogTitle>

            <DialogContent dividers className={cx('content')}>
                <Stack>
                    <Stack direction="row">
                        <button className={cx(addNewTransaction ? 'select' : 'un-active-select')} onClick={() => {
                            if (addNewTransaction) {
                                setOpenWalletSelectionDialog(true)
                            }
                        }}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Wallet</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar className={cx('select-avatar')} src={selectedEditWallet ? selectedEditWallet.avatar : ''} />
                                        <Typography className={cx('select-name')}>{selectedEditWallet ? selectedEditWallet.name : 'Select wallet'}</Typography>
                                    </Stack>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <button className={cx('select')} onClick={() => setOpenCategorySelectionDialog(true)}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Category</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar className={cx('select-avatar')} src={selectedCategory ? selectedCategory.avatar : ''}/>
                                        <Typography className={cx('select-name')}>{selectedCategory ? selectedCategory.name : 'Select category'}</Typography>
                                    </Stack>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <Stack alignItems="flex-start" className={cx('select-amount')}>
                            <Typography className={cx('select-title')}>Amount</Typography>
                            <NumericFormat className={cx('input-amount')} placeholder={CURRENCY_UNIT} decimalScale={0}
                                thousandsGroupStyle="thousand" thousandSeparator="," suffix={` ${CURRENCY_UNIT}`} value={addNewTransaction ? null : amount} onValueChange={(values, _) => setAmount(values.value)} />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <button className={cx('select')} onClick={() => setOpenDatePickerDialog(true)}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Date</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Typography className={cx('date')}>{date.format('DD/MM/YYYY')}</Typography>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <Stack alignItems="flex-start" className={cx('select-note')}>
                            <Typography className={cx('select-title')}>Note</Typography>
                            <InputBase className={cx('input-note')} value={note} onChange={e => {
                                setNote(e.target.value)
                            }} placeholder="Note" />
                        </Stack>
                    </Stack>


                    <WalletSelectionDialog 
                        listWallets={listWallets} 
                        selectedWallet={selectedEditWallet} 
                        setSelectedWallet={setSelectedEditWallet}
                        open={openWalletSelectionDialog} 
                        setOpen={setOpenWalletSelectionDialog} />

                    <CategorySelectionDialog 
                        categories={dicCategories} 
                        selectedCategory={selectedCategory} 
                        setSelectedCategory={setSelectedCategory}
                        open={openCategorySelectionDialog} 
                        setOpen={setOpenCategorySelectionDialog} />

                    {
                        openDatePickerDialog &&
                        <DatePickerDialog 
                            date={date}
                            setDate={setDate} 
                            open={openDatePickerDialog} 
                            setOpen={setOpenDatePickerDialog} 
                           />
                    }
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button className={cx('btn', 'cancel-btn')} onClick={() => {
                    setOpenEditDialog(false)
                }}>
                    Cancel
                </Button>
                <Button className={cx('btn', enableToSave ? 'save-btn' : 'un-active-saving')} disabled={!enableToSave} onClick={() => {
                    handleSavingChange()
                    setOpenDetail(false)
                    setOpenEditDialog(false)
                }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default memo(TransactionEditDialog);