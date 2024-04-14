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
import { useSnackbar } from 'notistack';

const cx = classNames.bind(styles)

const userId = 'c9d4c053-49b6-410c-bc78-2d54a9991870'

const sumOfTransactions = (transactions) =>
    transactions.reduce((n, { amount }) => n + amount, 0)

function Transactions() {

    const {auth, setAuth} = useContext(AuthContext)
    const { walletId } = useParams()
    const [isShowingDetail, setIsShowingDetail] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [addNewTransaction, setAddNewTransaction] = useState(true)
    const [centerMonth, setCenterMonth] = useState(new Date())
    const [rangeMonths, setRangeMonths] = useState([])
    const [listWallets, setListWallets] = useState([])
    const [loadingListWallet, setLoadingListWallet] = useState(true)
    const [loadingTransactions, setLoadingTransactions] = useState(true)
    const [listTransactions, setListTransactions] = useState([])
    const [inflowAmount, setInflowAmount] = useState(0)
    const [outflowAmount, setOutflowAmount] = useState(0)
    const [dicCategories, setDicCategories] = useState()
    const [selectedTransaction, setSelectedTransaction] = useState()
    const [selectedWallet, setSelectedWallet] = useState()
    const { enqueueSnackbar } = useSnackbar();
    const negative = useNavigate()
    const openCloseDetail = useCallback((open) => setIsShowingDetail(open), [])
    const selectTransaction = useCallback((transaction) => setSelectedTransaction(transaction), [])
    const selectWallet = useCallback((wallet) => setSelectedWallet(wallet), [])
   
    const openCloseEditDialog = useCallback((open, add) => {
        setOpenEditDialog(open)
        setAddNewTransaction(add)
    }, [])

    const getTransactions = useCallback(() => {
        setLoadingTransactions(true)
        if (selectedWallet) {
            if (walletId) {
                transactionService.getTransactionsInMonthForWallet(userId, walletId, centerMonth)
                    .then(result => {
                        setListTransactions(result)
                        setLoadingTransactions(false)
                    })
            } else {
                transactionService.getAllTransactionsInMonth(userId, centerMonth)
                    .then(result => {
                        setListTransactions(result)
                        setLoadingTransactions(false)
                    })
            }
        }
    }, [centerMonth, selectedWallet])

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };

    useEffect(() => {
        setRangeMonths(getRangeMonths(centerMonth))
        openCloseDetail(false)
    }, [centerMonth])

    useEffect(() => {
        // get wallets
        walletService.getAllWalletsForUser(userId)
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
    }, [])

    useEffect(() => {
        // get transactions
        getTransactions()
    }, [centerMonth, selectedWallet])

    useEffect(() => {
        openCloseDetail(false)
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
    }, [])



    return (
        <Fragment>
            {loadingListWallet ?
                <Box sx={{ height: '100vh' }}>
                    {/* <LoadingProgress /> */}
                    <Button onClick={handleClick}>Show snackbar</Button>
                    <Button onClick={handleClickVariant('error')}>Show success snackbar</Button>
                </Box>
                :
                <Fragment>
                    <TransactionsHeader listWallets={listWallets} selectedWallet={selectedWallet} selectWallet={selectWallet} />
                    {loadingTransactions &&
                        <Box className={cx('transaction-loading')}>
                            <LoadingProgress />
                        </Box>}
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
                                <ListTransactions categories={dicCategories} transactions={listTransactions} selectTransaction={selectTransaction} openCloseDetail={openCloseDetail} />
                            </Stack>
                        </Stack>

                        <Stack className={cx('transaction-detail', isShowingDetail ? 'transaction-detail-show' : null)}>
                            <TransactionDetail transaction={selectedTransaction} categories={dicCategories} wallets={listWallets} openCloseDetail={openCloseDetail} openCloseEditDialog={openCloseEditDialog} />
                        </Stack>

                        <Tooltip title={<h2>Add transaction</h2>} arrow>
                            <Fab color="primary" aria-label="add" className={cx('add-transaction-btn')}
                                onClick={() => {
                                    openCloseEditDialog(true, true)
                                }}>
                                <AddIcon sx={{ fontSize: 26 }} />
                            </Fab>
                        </Tooltip>

                        <TransactionEditDialog userId={userId} listWallets={listWallets} categories={dicCategories} transaction={selectedTransaction} wallet={selectedWallet} reloadTransactions={getTransactions} open={openEditDialog} openCloseEditDialog={openCloseEditDialog} add={addNewTransaction} />
                    </Stack>
                </Fragment>
            }
        </Fragment>
    );
}

export default Transactions;