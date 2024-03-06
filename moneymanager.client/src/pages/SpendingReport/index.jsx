import { Fragment, useCallback, useMemo, useState } from "react";
import classNames from "classnames/bind";
import ReportHeader from "../../components/ReportHeader";
import styles from "./SpendingReport.module.scss"
import { Divider, Stack, Box } from "@mui/material";
import { BarChart, PieChart } from '@mui/x-charts';
import { CURRENCY_UNIT } from "../../utils/constants";
import ReportDetail from "../../components/ReportDetail";

const cx = classNames.bind(styles)

const inflowData = [
    0, 12, 65, 120, 150, 60, 520, 630, 123, 1,
    0, 12, 65, 120, 150, 60, 520, 630, 123, 1,
    0, 12, 65, 120, 150, 60, 520, 630, 123, 1000,
]

const outflowData = [
    0, -12, -65, -120, -150, -60, -520, -630, -123, -1,
    0, -12, -65, -120, -150, -60, -520, -630, -123, -1,
    0, -12, -65, -120, -150, -60, -520, -630, -123, -1000,
]

function SpendingReport() {
    const [isShowingDetail, setIsShowingDetail] = useState(false)
    const openCloseDetail = useCallback((open) => setIsShowingDetail(open))
    const monthData = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
    const moneyFormatter = (value) => `${value}k ${CURRENCY_UNIT}`;

    return (
        <Fragment>
            <ReportHeader />
            <Stack className={cx('wrapper')} justifyContent="center" direction="row">
                <Stack className={cx('reports')} alignItems="center">
                    <span className={cx('total-balance')}>Total balance: +6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                    <Stack width="100%" sx={{ p: "0 20px" }}>
                        <BarChart
                            series={[
                                { data: inflowData, label: 'Inflow', valueFormatter: moneyFormatter, stack: 'money' },
                                { data: outflowData, label: 'Outflow', valueFormatter: moneyFormatter, stack: 'money' },
                            ]}
                            xAxis={[{ scaleType: 'band', data: monthData }]}
                            height={400}
                            colors={['#039be5', '#e51c23']}
                            slotProps={{ legend: { hidden: true } }}
                        />
                    </Stack>
                    <Divider className={cx('divider')} />
                    <Stack direction="row" alignItems="center" justifyContent="center" justifyItems="center">
                        <Stack className={cx('inflow-pie')} alignItems="center">
                            <Stack alignItems="center">
                                <span>Inflow</span>
                                <span className={cx('inflow')}>+6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                            </Stack>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'series A' },
                                            { id: 1, value: 15, label: 'series B' },
                                            { id: 2, value: 20, label: 'series C' },
                                            { id: 2, value: 20, label: 'series C' },
                                            { id: 2, value: 20, label: 'series C' },
                                            { id: 2, value: 20, label: 'series C' },
                                            { id: 2, value: 20, label: 'series C' },
                                        ],
                                        innerRadius: 50,
                                        outerRadius: 100,
                                    },
                                ]}
                                width={400}
                                height={200}
                                slotProps={{
                                    legend: {
                                        padding: 0,
                                    }
                                }}
                                skipAnimation={true}
                                colors={['#0F86B2', '#13B6C0', '#1DDA95', '#3DE478', '#5EED69', '#99F481', '#CEF9A6']}
                            />
                        </Stack>
                        <Stack className={cx('outflow-pie')} alignItems="center">
                            <Stack alignItems="center">
                                <span>Outflow</span>
                                <span className={cx('outflow')}>-6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                            </Stack>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'series A' },
                                            { id: 1, value: 15, label: 'series B' },
                                            { id: 2, value: 20, label: 'series C' },
                                            { id: 2, value: 20, label: 'series d' },
                                            { id: 2, value: 20, label: 'series e' },
                                            { id: 2, value: 20, label: 'series f' },
                                            { id: 2, value: 20, label: 'series g' },
                                        ],
                                        innerRadius: 50,
                                        outerRadius: 100,
                                    },
                                ]}
                                width={400}
                                height={200}
                                slotProps={{
                                    legend: {
                                        padding: 0,
                                    }
                                }}
                                skipAnimation={true}
                                colors={['#FF6858', '#FF7D3F', '#FF9C28', '#F0B723', '#E1CF1E', '#D1D31A', '#A5C416']}
                            />
                        </Stack>
                    </Stack>
                </Stack>

                <Stack className={cx('report-detail', isShowingDetail ? 'report-detail-show' : null)}>
                    <ReportDetail openCloseDetail={openCloseDetail} />
                </Stack>
            </Stack>
        </Fragment>
    );
}

export default SpendingReport;