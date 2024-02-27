import classNames from "classnames/bind";
import styles from "./TransactionEdit.module.scss"
import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, Grid, TextField, InputBase, Button, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { memo, useCallback, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NumericFormat } from 'react-number-format';
import { CURRENCY_UNIT } from '../../utils/constants'
import WalletSelectionDialog from "../WalletSelectionDialog";
import CategorySelectionDialog from "../CategorySelectionDialog";
import DatePickerDialog from "../DatePickerDialog";
import dayjs from "dayjs";


const cx = classNames.bind(styles)

function TransactionEditDialog({ open, openCloseEditDialog, add }) {
    const [date, setDate] = useState(dayjs('2022-04-17'));
    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseEditDialog(false);
    }
    const [openWalletSelectionDialog, setOpenWalletSelectionDialog] = useState(false)
    const openCloseWalletSelectionDialog = useCallback((open) => setOpenWalletSelectionDialog(open))
    const [openCategorySelectionDialog, setOpenCategorySelectionDialog] = useState(false)
    const openCloseCategorySelectionDialog = useCallback((open) => setOpenCategorySelectionDialog(open))
    const [openDatePickerDialog, setOpenDatePickerDialog] = useState(false)
    const openCloseDatePickerDialog = useCallback((open) => setOpenDatePickerDialog(open))

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 1008,
                    maxHeight: 362
                }
            }}>

            <DialogTitle sx={{ fontSize: "2.0rem", fontWeight: 600 }}>
                {add ? "Add transaction" : "Edit transaction"}
            </DialogTitle>

            <DialogContent dividers className={cx('content')}>
                <Stack>
                    <Stack direction="row">
                        <button className={cx('select')} onClick={() => openCloseWalletSelectionDialog(true)}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Wallet</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar className={cx('select-avatar')} />
                                        <Typography className={cx('select-name')}>Wallet</Typography>
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
                                        <Typography className={cx('select-name')}>Category</Typography>
                                    </Stack>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <Stack alignItems="flex-start" className={cx('select-amount')}>
                            <Typography className={cx('select-title')}>Amount</Typography>
                            <NumericFormat className={cx('input-amount')} placeholder={CURRENCY_UNIT} decimalScale={0}
                                thousandsGroupStyle="thousand" thousandSeparator="," suffix={` ${CURRENCY_UNIT}`} />
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <button className={cx('select')} onClick={() => openCloseDatePickerDialog(true)}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Date</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Typography className={cx('date')}>11/06/2019</Typography>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>

                        <Stack alignItems="flex-start" className={cx('select-note')}>
                            <Typography className={cx('select-title')}>Note</Typography>
                            <InputBase className={cx('input-note')} placeholder="Note" />
                        </Stack>
                    </Stack>

                    <WalletSelectionDialog open={openWalletSelectionDialog} openCloseDialog={openCloseWalletSelectionDialog} />

                    <CategorySelectionDialog open={openCategorySelectionDialog} openCloseDialog={openCloseCategorySelectionDialog} />

                    <DatePickerDialog open={openDatePickerDialog} openCloseDialog={openCloseDatePickerDialog} date={date} setDate={setDate} />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button className={cx('btn', 'cancel-btn')} onClick={() => openCloseEditDialog(false)}>
                    Cancel
                </Button>
                <Button className={cx('btn', 'save-btn')}>
                    Save
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default memo(TransactionEditDialog);