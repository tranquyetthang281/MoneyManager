import { Avatar, Divider, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import dateFormat from "dateformat";
import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import styles from './TransactionDetail.module.scss'
import currencyFormatter from "@/utils/currencyFormatter";

const cx = classNames.bind(styles)

function TransactionDetail({ transaction, wallets, categories, openCloseDetail, openCloseEditDialog }) {

    const [walletName, setWalletName] = useState('')

    useEffect(() => {
        if (transaction) {
            const wallet = wallets.find(w => w.id === transaction.walletId)
            if (wallet) {
                setWalletName(wallet.name)
            }
        }
    }, [transaction])

    return (
        <Stack sx={{ m: 0, p: 0, width: "100%", height: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div>
                    <button className={cx('close-btn')} onClick={() => openCloseDetail(false)}>
                        <CloseIcon sx={{ width: "25px", height: "25px" }} />
                    </button>
                    <Typography variant="div" sx={{ fontWeight: 600, fontSize: "20px" }}>Transaction details</Typography>
                </div>

                <div>
                    <button className={cx('btn', 'delete-btn')}>Delete</button>
                    <button className={cx('btn', 'edit-btn')} onClick={() => {
                        openCloseEditDialog(true, false)
                    }}>Edit</button>
                </div>
            </Stack>
            <Divider />
            {
                transaction && categories[transaction.categoryId] &&
                <Stack direction="row">
                    <Avatar sx={{ m: "20px 20px 0 50px", width: "56px", height: "56px" }} />
                    <Stack sx={{ mt: "20px" }}>
                        <Typography sx={{ fontSize: "22px" }}>{categories[transaction.categoryId].name}</Typography>
                        <Typography sx={{ fontSize: "14px" }}>{walletName}</Typography>
                        <Typography sx={{ fontSize: "12px", mt: "8px", color: "rgb(154,154,154)" }}>{dateFormat(transaction.date, 'dddd, dd/mm/yyyy')}</Typography>
                        <Divider primary="Inset below" sx={{ width: 150, alignSelf: "start", height: 10, borderBottomWidth: 2 }} />
                        <Typography sx={{ fontSize: "12px", mt: "10px" }}>{transaction.note}</Typography>
                        <Typography variant="h2" sx={{ color: categories[transaction.categoryId].type > 0 ? "#039be5" : "#e51c23", mt: "5px" }}>{currencyFormatter(transaction.amount)}</Typography>
                    </Stack>
                </Stack>}
        </Stack >
    );
}

export default memo(TransactionDetail);