import { Stack, Divider, Fab, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Fragment, useCallback, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Transactions.module.scss"
import { CURRENCY_UNIT } from "../../utils/constants";
import ListTransactions from "../../components/ListTransactions";
import TransactionDetail from "../../components/TransactionDetail";
import TransactionEditDialog from "../../components/TransactionEditDialog";
import TransactionsHeader from "../../components/TransactionsHeader";

const cx = classNames.bind(styles)

function Transactions() {

    const [isShowingDetail, setIsShowingDetail] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const openCloseDetail = useCallback((open) => setIsShowingDetail(open))
    const openCloseEditDialog = useCallback((open) => setOpenEditDialog(open))

    return (
        <Fragment>
            <TransactionsHeader />
            <Stack className={cx('wrapper')} justifyContent="center" direction="row">
                <Stack className={cx('transactions-list')}>
                    <Stack className={cx('time-select')} direction="row">
                        <button className={cx('time-select-btn')}>01/07/2024-01/07/2024</button>
                        <button className={cx('time-select-btn', 'time-select-btn-center')}>01/07/2024-01/07/2024</button>
                        <button className={cx('time-select-btn')}>01/07/2024-01/07/2024</button>
                    </Stack>
            
                    <Stack sx={{ overflowY: "scroll" }}>
                        <Stack sx={{ height: 100, p: "20px", fontSize: "1.4rem", mb: "25px" }}>
                            <Stack justifyContent="space-between" direction="row">
                                <span>Inflow</span>
                                <span className={cx('money-in')}>+6,800,000 <u>{CURRENCY_UNIT}</u></span>
                            </Stack>
                            <Stack justifyContent="space-between" direction="row" sx={{ mt: "10px" }}>
                                <span>Outflow</span>
                                <span className={cx('money-out')}>-6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                            </Stack>
                            <Divider primary="Inset below" sx={{ width: 120, alignSelf: "end", height: 10, borderBottomWidth: 2 }} />
                            <span style={{ alignSelf: "end", marginTop: 10 }}>-6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                        </Stack>
                        <ListTransactions openCloseDetail={openCloseDetail} />
                    </Stack>
                </Stack>
            
                <Stack className={cx('transaction-detail', isShowingDetail ? 'transaction-detail-show' : null)}>
                    <TransactionDetail openCloseDetail={openCloseDetail} />
                </Stack>
            
                <Tooltip title={<h2>Add transaction</h2>} arrow>
                    <Fab color="primary" aria-label="add" className={cx('add-transaction-btn')}
                        onClick={() => openCloseEditDialog(true)}>
                        <AddIcon sx={{ fontSize: 26 }} />
                    </Fab>
                </Tooltip>
            
                <TransactionEditDialog open={openEditDialog} openCloseEditDialog={openCloseEditDialog} add />
            </Stack>
        </Fragment>
    );
}

export default Transactions;