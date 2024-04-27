import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import dateFormat from "dateformat";
import { useParams } from "react-router-dom";
import { Divider, Stack, Box, Avatar, Typography, Paper } from "@mui/material";
import { BarChart, PieChart } from '@mui/x-charts';
import { categoryService, transactionService, walletService } from "@/apiServices";
import { AuthContext } from "@/components/AuthProvider";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";
import LoadingProgress from "@/components/LoadingProgress";
import currencyFormatter, { currencyFormatterByK } from "@/utils/currencyFormatter";
import ReportDetail from "./ReportDetail";
import styles from "./SpendingReport.module.scss"
import ReportHeader from "./ReportHeader";
import { DefaultChartsItemTooltipContent } from '@mui/x-charts/ChartsTooltip';
import CustomItemTooltipContent from "./CustomItemTooltipContent";

const cx = classNames.bind(styles)

function SpendingReport() {

    const { auth } = useContext(AuthContext)
    const { walletId } = useParams()
    const [listWallets, setListWallets] = useState([])
    const [selectedWallet, setSelectedWallet] = useState()
    const [openDetail, setOpenDetail] = useState(true)
    const [inflowDetail, setInflowDetail] = useState(false)
    const [loadingListWallet, setLoadingListWallet] = useState(true)
    const [loadingTransactions, setLoadingTransactions] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState(dayjs())
    const [dicCategories, setDicCategories] = useState()
    const [listTransactions, setListTransactions] = useState([])
    const [inflowAmount, setInflowAmount] = useState(0)
    const [outflowAmount, setOutflowAmount] = useState(0)
    const [monthDays, setMonthDays] = useState([])
    const [inflowData, setInflowData] = useState([])
    const [outflowData, setOutflowData] = useState([])
    const [inflowCategoryData, setInflowCategoryData] = useState([])
    const [outflowCategoryData, setOutflowCategoryData] = useState([])
    const [inflowTransByCategory, setInflowTransByCategory] = useState()
    const [outflowTransByCategory, setOutflowTransByCategory] = useState()
    const [barChartSeries, setBarChartSeries] = useState([])
    const showErrorSnackbar = useErrorSnackbar()

    useEffect(() => {
        const length = selectedMonth.daysInMonth()
        setMonthDays(Array.from({ length: length }, (_, i) => i + 1))
    }, [selectedMonth])

    const selectWallet = useCallback((wallet) => setSelectedWallet(wallet), [])

    const sumOfTransactions = (transactions) =>
        transactions.reduce((n, { amount }) => n + amount, 0)

    const sumOfData = (data) =>
        data.reduce((n, { value }) => n + value, 0)

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

    const getTransactions = () => {
        setLoadingTransactions(true)
        if (selectedWallet) {
            if (walletId) {
                transactionService.getTransactionsInMonthForWallet(auth.userId, walletId, selectedMonth, auth.accessToken)
                    .then(result => {
                        setListTransactions(result)
                        setLoadingTransactions(false)
                    })
                    .catch(e => showErrorSnackbar(e.message))
            } else {
                transactionService.getAllTransactionsInMonth(auth.userId, selectedMonth, auth.accessToken)
                    .then(result => {
                        setListTransactions(result)
                        setLoadingTransactions(false)
                    })
                    .catch(e => showErrorSnackbar(e.message))
            }
        }
    }

    const setTransactionsByCategory = (inflowTrans, outflowTrans) => {
        const inflowTransByCategory = []
        const outflowTransByCategory = []
        const sumInflow = sumOfTransactions(inflowTrans)
        const sumOutflow = Math.abs(sumOfTransactions(outflowTrans))
        let inflowData = []
        let outflowData = []
        Object.entries(dicCategories).forEach(([_, c], index) => {
            if (c.type > 0) {
                const trans = inflowTrans.filter(t => t.categoryId === c.id)
                if (trans.length > 0) {
                    inflowTransByCategory.push(trans)
                }
                const sum = sumOfTransactions(trans)
                inflowData.push({
                    id: index,
                    value: sum,
                    label: c.name,
                    percent: sum / sumInflow,
                    avatar: c.avatar
                })
            } else {
                const trans = outflowTrans.filter(t => t.categoryId === c.id)
                if (trans.length > 0) {
                    outflowTransByCategory.push(trans)
                }
                const sum = Math.abs(sumOfTransactions(trans))
                outflowData.push({
                    id: index,
                    value: sum,
                    label: c.name,
                    percent: sum / sumOutflow,
                    avatar: c.avatar
                })
            }
        })
        inflowData = inflowData.sort((x, y) => y.value - x.value).filter(x => x.value !== 0)
        if (inflowData.length > 7) {
            const otherSum = sumOfData(inflowData.filter((_, index) => index >= 6))
            inflowData = inflowData.filter((_, index) => index <= 6)
            inflowData[6] = {
                id: 100,
                value: otherSum,
                label: 'Others',
                percent: otherSum / sumOutflow,
                avatar: 'others.png'
            }
        }
        outflowData = outflowData.sort((x, y) => y.value - x.value).filter(x => x.value !== 0)
        if (outflowData.length > 7) {
            const otherSum = sumOfData(outflowData.filter((_, index) => index >= 6))
            outflowData = outflowData.filter((_, index) => index <= 6)
            outflowData[6] = {
                id: 100,
                value: otherSum,
                label: 'Others',
                percent: otherSum / sumOutflow,
                avatar: 'others.png'
            }
        }
        inflowTransByCategory.sort((x, y) => Math.abs(sumOfTransactions(y)) - Math.abs(sumOfTransactions(x)))
        outflowTransByCategory.sort((x, y) => Math.abs(sumOfTransactions(y)) - Math.abs(sumOfTransactions(x)))
        setInflowTransByCategory(inflowTransByCategory)
        setOutflowTransByCategory(outflowTransByCategory)
        setInflowCategoryData(inflowData)
        setOutflowCategoryData(outflowData)
    }

    const setDataForBarChart = (inflowTrans, outflowTrans) => {
        const length = selectedMonth.daysInMonth()
        const inflowData = Array(length).fill(0);
        const outflowData = Array(length).fill(0);
        inflowTrans.forEach(transaction => {
            const date = dateFormat(transaction.date, 'd')
            inflowData[date - 1] += (transaction.amount / 1000)
        })
        outflowTrans.forEach(transaction => {
            const date = dateFormat(transaction.date, 'd')
            outflowData[date - 1] += (transaction.amount / 1000)
        })
        setInflowAmount(sumOfTransactions(inflowTrans))
        setOutflowAmount(sumOfTransactions(outflowTrans))
        setMonthDays(Array.from({ length: length }, (_, i) => i + 1))
        setInflowData(inflowData)
        setOutflowData(outflowData)
    }

    useEffect(() => {
        getWallets()
    }, [])

    useEffect(() => {
        if (dicCategories) {
            const inflowTrans = listTransactions.filter(t => dicCategories[t.categoryId].type > 0)
            const outflowTrans = listTransactions.filter(t => dicCategories[t.categoryId].type < 0)
            setDataForBarChart(inflowTrans, outflowTrans)
            setTransactionsByCategory(inflowTrans, outflowTrans)
        }
    }, [listTransactions, dicCategories])

    useEffect(() => {
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

    useEffect(() => {
        getTransactions()
    }, [selectedMonth, selectedWallet])

    useEffect(() => {
        const series = []
        if (inflowData.length > 0) {
            series.push({
                data: inflowData,
                label: 'Inflow',
                valueFormatter: currencyFormatterByK,
                stack: 'money'
            })
        }
        if (outflowData.length > 0) {
            series.push({
                data: outflowData,
                label: 'Outflow',
                valueFormatter: currencyFormatterByK,
                stack: 'money'
            })
        }
        setBarChartSeries(series)
    }, [inflowData, outflowData])

    return (
        <Fragment>
            {
                loadingListWallet ?
                    <LoadingProgress />
                    :
                    <Fragment>
                        <ReportHeader
                            listWallets={listWallets}
                            selectedWallet={selectedWallet}
                            selectWallet={selectWallet}
                            selectedMonth={selectedMonth}
                            setSelectedMonth={setSelectedMonth} />
                        {loadingTransactions ?
                            <LoadingProgress />
                            :
                            < Stack className={cx('wrapper')} justifyContent="center" direction="row">
                                <Stack className={cx('reports')} alignItems="center">
                                    <span className={cx('total-balance')}>Total balance: {currencyFormatter(inflowAmount + outflowAmount)}</span>
                                    <Stack width="100%" sx={{ p: "0 20px" }}>
                                        {
                                            monthDays.length > 0 && barChartSeries.length > 0 &&
                                            <BarChart
                                                grid={{ horizontal: true }}
                                                series={barChartSeries}
                                                xAxis={[{ scaleType: 'band', data: monthDays }]}
                                                height={400}
                                                colors={['#039be5', '#e51c23']}
                                                slotProps={{ legend: { hidden: true } }}
                                            />
                                        }
                                    </Stack>
                                    <Divider className={cx('divider')} />
                                    <Stack direction="row" alignItems="center" justifyContent="center" justifyItems="center">
                                        <Stack className={cx('inflow-pie')} alignItems="center" onClick={() => {
                                            setOpenDetail(true)
                                            setInflowDetail(true)
                                        }}>
                                            <Stack alignItems="center">
                                                <span>Inflow</span>
                                                <span className={cx('inflow')}>{currencyFormatter(inflowAmount)}</span>
                                            </Stack>
                                            <PieChart
                                                series={[
                                                    {
                                                        data: inflowCategoryData,
                                                        innerRadius: 30,
                                                        outerRadius: 80,
                                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                                        faded: { innerRadius: 20, additionalRadius: -30, color: 'gray' },
                                                        valueFormatter: (data) => `${currencyFormatter(data.value)}`
                                                    },
                                                ]}
                                                width={400}
                                                height={250}
                                                slotProps={{
                                                    legend: {
                                                        labelStyle: {
                                                            fontSize: '12px',
                                                        }
                                                    }
                                                }}
                                                colors={['#0F86B2', '#13B6C0', '#1DDA95', '#3DE478', '#5EED69', '#99F481', '#CEF9A6']}
                                                tooltip={{ trigger: "item", itemContent: CustomItemTooltipContent }}
                                            />
                                        </Stack>
                                        <Stack className={cx('outflow-pie')} alignItems="center" onClick={() => {
                                            setOpenDetail(true)
                                            setInflowDetail(false)
                                        }}>
                                            <Stack alignItems="center">
                                                <span>Outflow</span>
                                                <span className={cx('outflow')}>{currencyFormatter(outflowAmount)}</span>
                                            </Stack>
                                            <PieChart
                                                series={[
                                                    {
                                                        data: outflowCategoryData,
                                                        innerRadius: 30,
                                                        outerRadius: 80,
                                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                                        faded: { innerRadius: 20, additionalRadius: -30, color: 'gray' },
                                                        valueFormatter: (data) => `${currencyFormatter(-data.value)}`
                                                    },
                                                ]}
                                                width={400}
                                                height={250}
                                                slotProps={{
                                                    legend: {
                                                        labelStyle: {
                                                            fontSize: '12px',
                                                        }
                                                    }
                                                }}
                                                colors={['#FF6858', '#FF7D3F', '#FF9C28', '#F0B723', '#E1CF1E', '#D1D31A', '#A5C416']}
                                                tooltip={{ trigger: "item", itemContent: CustomItemTooltipContent }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Stack className={cx('report-detail', openDetail ? 'report-detail-show' : null)}>
                                    <ReportDetail
                                        transByCategory={inflowDetail ? inflowTransByCategory : outflowTransByCategory}
                                        categoryData={inflowDetail ? inflowCategoryData : outflowCategoryData}
                                        inflow={inflowDetail}
                                        amount={inflowDetail ? inflowAmount : outflowAmount}
                                        dicCategories={dicCategories}
                                        monthDays={monthDays}
                                        setOpenDetail={setOpenDetail}
                                    />
                                </Stack>
                            </Stack>}
                    </ Fragment>
            }
        </Fragment >
    );
}

export default SpendingReport;