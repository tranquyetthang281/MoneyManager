import { Stack, Divider, Fab, Tooltip, Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Transactions.module.scss"
import ListTransactions from "./ListTransactions";
import TransactionDetail from "./TransactionDetail";
import TransactionEditDialog from "./TransactionEditDialog";
import TransactionsHeader from "./TransactionsHeader";
import { getRangeMonths } from "@/utils/getRangeMonths"
import { walletService, categoryService, transactionService } from "@/apiServices"
import LoadingProgress from "@/components/LoadingProgress";
import currencyFormatter from "@/utils/currencyFormatter";
import { AuthContext } from "@/components/AuthProvider";
import TransactionsPageProvider, { TransactionsPageContext } from "./TransactionsPageProvider";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";

const cx = classNames.bind(styles)

function Transactions() {

    return (
        <TransactionsPageProvider>
            <TransactionsPage />
        </TransactionsPageProvider>
    )
}

function TransactionsPage() {

    const [rangeMonths, setRangeMonths] = useState([])
    const [inflowAmount, setInflowAmount] = useState(0)
    const [outflowAmount, setOutflowAmount] = useState(0)
    const [loadingListWallet, setLoadingListWallet] = useState(true)
    const [loadingTransactions, setLoadingTransactions] = useState(true)
    const { walletId } = useParams()
    const negative = useNavigate()
    const { auth } = useContext(AuthContext)
    const {
        centerMonth, 
        setCenterMonth,
        selectedWallet,
        setListWallets,
        setSelectedWallet,
        listTransactions,
        setListTransactions,
        dicCategories,
        setDicCategories,
        openDetail,
        setOpenDetail,
        setOpenEditDialog,
        setAddNewTransaction,
    } = useContext(TransactionsPageContext)
    const showErrorSnackbar = useErrorSnackbar()

    const sumOfTransactions = (transactions) =>
        transactions.reduce((n, { amount }) => n + amount, 0)

    const getTransactions = () => {
        setLoadingTransactions(true)
        if (selectedWallet) {
            if (walletId) {
                transactionService.getTransactionsInMonthForWallet(auth.userId, walletId, centerMonth, auth.accessToken)
                    .then(result => {
                        setListTransactions(result)
                        setLoadingTransactions(false)
                    })
                    .catch(e => showErrorSnackbar(e.message))
            } else {
                transactionService.getAllTransactionsInMonth(auth.userId, centerMonth, auth.accessToken)
                    .then(result => {
                        setListTransactions(result)
                        setLoadingTransactions(false)
                    })
                    .catch(e => showErrorSnackbar(e.message))
            }
        }
    }

    const getWallets = () => {
        walletService.getAllWalletsForUser(auth.userId, auth.accessToken)
            .then(result => {
                setListWallets(result)
                if (walletId) {
                    const selectedWallet = result.find(w => w.id === walletId)
                    if (selectedWallet) {
                        setSelectedWallet(selectedWallet)
                    }
                    else {
                        negative('/404-not-found')
                    }
                } else {
                    setSelectedWallet(result[0])
                }
                setLoadingListWallet(false)
            })
            .catch(e => showErrorSnackbar(e.message))
    }

    const reloadTransactions = useCallback(() => {
        getWallets()
        getTransactions()
    }, [centerMonth, selectedWallet])

    useEffect(() => {
        setRangeMonths(getRangeMonths(centerMonth))
        setOpenDetail(false)
    }, [centerMonth])

    useEffect(() => {
        getWallets()
    }, [])

    useEffect(() => {
        getTransactions()
    }, [centerMonth, selectedWallet])

    useEffect(() => {
        setOpenDetail(false)
    }, [selectedWallet])

    useEffect(() => {
        // get total balance amount
        if (dicCategories) {
            const inflowTrans = listTransactions.filter(t => dicCategories[t.categoryId].type > 0)
            const outflowTrans = listTransactions.filter(t => dicCategories[t.categoryId].type < 0)
            setInflowAmount(sumOfTransactions(inflowTrans))
            setOutflowAmount(sumOfTransactions(outflowTrans))
        }
    }, [listTransactions, dicCategories])

    useEffect(() => {
        // get categories
        categoryService.getAllCategories()
            .then(result => {
                const categories = result.reduce((dictionary, category) => {
                    dictionary[category.id] = category
                    return dictionary
                }, {})
                setDicCategories(categories)
            })
            .catch(e => showErrorSnackbar(e.message))
    }, [])

    return (
        <Fragment>
            {
                loadingListWallet ?
                    <LoadingProgress />
                    :
                    <Fragment>
                        <TransactionsHeader />
                        {
                            loadingTransactions &&
                            <Box className={cx('transaction-loading')}>
                                <LoadingProgress />
                            </Box>
                        }
                        <Stack className={cx('wrapper')} justifyContent="center" direction="row">
                            <Stack className={cx('transactions-list')}>
                                <Stack className={cx('time-select')} direction="row">
                                    <button className={cx('time-select-btn')} onClick={() =>
                                        setCenterMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
                                    }>{rangeMonths[0]}</button>
                                    <button className={cx('time-select-btn', 'time-select-btn-center')}>{rangeMonths[1]}</button>
                                    <button className={cx('time-select-btn')} onClick={() =>
                                        setCenterMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
                                    }>{rangeMonths[2]}</button>
                                </Stack>

                                <Stack sx={{ overflowY: "scroll" }}>
                                    <Stack sx={{ height: 100, p: "20px", fontSize: "14px", mb: "25px" }}>
                                        <Stack justifyContent="space-between" direction="row">
                                            <span>Inflow</span>
                                            <span className={cx('money-in')}>{currencyFormatter(inflowAmount)}</span>
                                        </Stack>
                                        <Stack justifyContent="space-between" direction="row" sx={{ mt: "10px" }}>
                                            <span>Outflow</span>
                                            <span className={cx('money-out')}>{currencyFormatter(outflowAmount)}</span>
                                        </Stack>
                                        <Divider primary="Inset below" sx={{ width: 120, alignSelf: "end", height: 10, borderBottomWidth: 2 }} />
                                        <span style={{ alignSelf: "end", marginTop: 10 }}>{currencyFormatter(outflowAmount + inflowAmount)}</span>
                                    </Stack>
                                    <ListTransactions />
                                </Stack>
                            </Stack>

                            <Stack className={cx('transaction-detail', openDetail ? 'transaction-detail-show' : null)}>
                                <TransactionDetail reloadTransactions={reloadTransactions} />
                            </Stack>

                            <Tooltip title={<h3>Add transaction</h3>} arrow>
                                <Fab color="primary" aria-label="add" className={cx('add-transaction-btn')}
                                    onClick={() => {
                                        setOpenEditDialog(true)
                                        setAddNewTransaction(true)
                                    }}>
                                    <AddIcon sx={{ fontSize: 26 }} />
                                </Fab>
                            </Tooltip>

                            <TransactionEditDialog reloadTransactions={reloadTransactions} />
                        </Stack>
                    </Fragment>
            }
        </Fragment>
    );
}

export default Transactions;