import { Avatar, Dialog, DialogContent, DialogTitle, Stack, Typography, InputBase, Button, DialogActions } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from "dayjs";
import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';
import styles from "./TransactionEditDialog.module.scss"
import { GUID_EMPTY, CURRENCY_UNIT } from '@/utils/constants'
import WalletSelectionDialog from "@/components/WalletSelectionDialog";
import CategorySelectionDialog from "@/components/CategorySelectionDialog";
import DatePickerDialog from "@/components/DatePickerDialog";
import * as transactionService from "@/apiServices/services/transactionService"

const cx = classNames.bind(styles)

function TransactionEditDialog({ userId, listWallets, categories, transaction, wallet, reloadTransactions, open, openCloseEditDialog, add }) {

    const [openWalletSelectionDialog, setOpenWalletSelectionDialog] = useState(false)
    const [openCategorySelectionDialog, setOpenCategorySelectionDialog] = useState(false)
    const [openDatePickerDialog, setOpenDatePickerDialog] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState()
    const [selectedCategory, setSelectedCategory] = useState()
    const [amount, setAmount] = useState()
    const [date, setDate] = useState(dayjs());
    const [note, setNote] = useState('')
    const [enableToSave, setEnableToSave] = useState(false)
    const selectWallet = useCallback((wallet) => { setSelectedWallet(wallet) }, [])
    const openCloseWalletSelectionDialog = useCallback((open) => setOpenWalletSelectionDialog(open), [])
    const openCloseCategorySelectionDialog = useCallback((open) => setOpenCategorySelectionDialog(open), [])
    const openCloseDatePickerDialog = useCallback((open) => setOpenDatePickerDialog(open), [])
    const selectCategory = useCallback((category) => { setSelectedCategory(category) }, [])
    const selectDate = useCallback((date) => setDate(date), [])

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseEditDialog(false, true);
    }

    const handleSavingChange = () => {
        if (add) {
            const transactionForCreation = {
                date: date,
                amount: selectedCategory.type > 0 ? amount : - amount,
                note: note,
                categoryId: selectedCategory.id,
                transferredUserId: null,
                transferredWalletId: null
            }
            transactionService.createNewTransaction(userId, selectedWallet.id, transactionForCreation)
                .then(() => reloadTransactions())
        }
        else {
            const transactionForUpdate = {
                date: date,
                amount: selectedCategory.type > 0 ? amount : - amount,
                note: note,
                categoryId: selectedCategory.id,
            }
            transactionService.updateTransaction(userId, selectedWallet.id, transaction.id, transactionForUpdate)
                .then(() => reloadTransactions())
        }
    }

    useEffect(() => {
        if (open && listWallets && wallet) {
            if (add) {
                if (wallet.id === GUID_EMPTY) {
                    setSelectedWallet(null)
                } else {
                    setSelectedWallet(wallet)
                }
            } else {
                if (transaction) {
                    const selectedWallet = listWallets.find(w => w.id === transaction.walletId)
                    setSelectedWallet(selectedWallet)
                }
            }
        }
    }, [listWallets, wallet, transaction, open])

    useEffect(() => {
        if (open) {
            if (!add && transaction && categories) {
                setSelectedCategory(categories[transaction.categoryId])
            } else {
                setSelectedCategory(null)
            }
        }
    }, [transaction, categories, open])

    useEffect(() => {
        if (open) {
            if (!add && transaction) {
                setAmount(Math.abs(transaction.amount))
                setDate(dayjs(transaction.date))
                setNote(transaction.note)
            }
            else {
                setAmount(null)
                setDate(dayjs())
                setNote('')
            }
        }
    }, [transaction, open])

    useEffect(() => {
        setEnableToSave(selectedWallet && selectedCategory && amount)
    }, [selectedWallet, selectedCategory, amount, open])

    return (

        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 1008,
                    maxHeight: 362
                }
            }}>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                {add ? "Add transaction" : "Edit transaction"}
            </DialogTitle>

            <DialogContent dividers className={cx('content')}>
                <Stack>
                    <Stack direction="row">
                        <button className={cx(add ? 'select' : 'un-active-select')} onClick={() => {
                            if (add) {
                                openCloseWalletSelectionDialog(true)
                            }
                        }}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Wallet</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar className={cx('select-avatar')} />
                                        <Typography className={cx('select-name')}>{selectedWallet ? selectedWallet.name : 'Select wallet'}</Typography>
                                    </Stack>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <button className={cx('select')} onClick={() => openCloseCategorySelectionDialog(true)}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Category</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar className={cx('select-avatar')} />
                                        <Typography className={cx('select-name')}>{selectedCategory ? selectedCategory.name : 'Select category'}</Typography>
                                    </Stack>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <Stack alignItems="flex-start" className={cx('select-amount')}>
                            <Typography className={cx('select-title')}>Amount</Typography>
                            <NumericFormat className={cx('input-amount')} placeholder={CURRENCY_UNIT} decimalScale={0}
                                thousandsGroupStyle="thousand" thousandSeparator="," suffix={` ${CURRENCY_UNIT}`} value={add ? null : amount} onValueChange={(values, _) => setAmount(values.value)} />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <button className={cx('select')} onClick={() => openCloseDatePickerDialog(true)}>
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


                    <WalletSelectionDialog listWallets={listWallets} selectedWallet={selectedWallet} selectWallet={selectWallet} open={openWalletSelectionDialog} openCloseDialog={openCloseWalletSelectionDialog} />

                    <CategorySelectionDialog categories={categories} selectedCategory={selectedCategory} selectCategory={selectCategory} open={openCategorySelectionDialog} openCloseDialog={openCloseCategorySelectionDialog} />

                    {
                        openDatePickerDialog &&
                        <DatePickerDialog open={openDatePickerDialog} openCloseDialog={openCloseDatePickerDialog} date={date} selectDate={selectDate} />
                    }
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button className={cx('btn', 'cancel-btn')} onClick={() => openCloseEditDialog(false, add)}>
                    Cancel
                </Button>
                <Button className={cx('btn', enableToSave ? 'save-btn' : 'un-active-saving')} disabled={!enableToSave} onClick={() => {
                    openCloseEditDialog(false, add)
                    handleSavingChange()
                }}>
                    Save
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default memo(TransactionEditDialog);