import classNames from "classnames/bind";
import CloseIcon from '@mui/icons-material/Close';
import { memo, useCallback, useState } from "react";
import { Stack, Typography, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar, Paper } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryChartDialog from '../CategoryChartDialog'
import currencyFormatter from "@/utils/currencyFormatter";
import styles from "./ReportDetail.module.scss"
import CustomItemTooltipContentLeft from "../CustomItemTooltipContentLeft";

const cx = classNames.bind(styles)

function ReportDetail({ transByCategory, categoryData, amount, inflow, dicCategories, monthDays, setOpenDetail }) {

    const [openCategoryChartDialog, setOpenCategoryChartDialog] = useState(false)
    const [transForChart, setTransForChart] = useState([])

    const sumOfTransactions = (transactions) =>
        transactions.reduce((n, { amount }) => n + amount, 0)

    return (
        <Stack sx={{ m: 0, p: 0, w: "100%", h: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div>
                    <button className={cx('close-btn')} onClick={() => setOpenDetail(false)}>
                        <CloseIcon sx={{ width: "25px", height: "25px" }} />
                    </button>
                    <Typography variant="div" sx={{ fontWeight: 600, fontSize: "20px" }}>
                        {inflow ? "Inflow" : "Outflow"}
                    </Typography>
                </div>
                <Typography sx={{ color: inflow ? '#039be5' : '#e51c23', fontWeight: 600, mr: "20px" }}>
                    {currencyFormatter(amount)}
                </Typography>
            </Stack>
            <Divider sx={{ mb: "20px" }} />
            <Stack>
                {
                    categoryData.length > 0 &&
                    <PieChart
                        series={[
                            {
                                data: categoryData,
                                innerRadius: 40,
                                outerRadius: 100,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
                                valueFormatter: (data) => `${currencyFormatter(inflow ? data.value : - data.value)}`
                            },
                        ]}
                        width={500}
                        height={250}
                        slotProps={{
                            legend: {
                                labelStyle: {
                                    fontSize: '12px',
                                }
                            },
                        }}
                        colors={
                            inflow ? ['#0F86B2', '#13B6C0', '#1DDA95', '#3DE478', '#5EED69', '#99F481', '#CEF9A6']
                                : ['#FF6858', '#FF7D3F', '#FF9C28', '#F0B723', '#E1CF1E', '#D1D31A', '#A5C416']}
                        tooltip={{ trigger: 'item', itemContent: CustomItemTooltipContentLeft }}
                    />}
            </Stack>
            <Divider sx={{ m: "20px 0 0 0" }} />
            {
                dicCategories && transByCategory &&
                <List sx={{ m: 0, p: 0 }}> {
                    transByCategory.map((trans, index) =>
                        <Stack key={index}>
                            <ListItem onClick={() => {
                                setTransForChart(trans)
                                setOpenCategoryChartDialog(true)
                            }}
                                sx={{
                                    p: 0, m: 0, "&:hover": {
                                        background: "rgba(45, 184, 76, .1)",
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ m: "15px" }} src={dicCategories[trans[0].categoryId].avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                                            {dicCategories[trans[0].categoryId].name}
                                        </Typography>
                                    }
                                >
                                </ListItemText>
                                <Typography sx={{
                                    fontSize: "14px", m: "20px",
                                    color: inflow ? "#039be5" : "#e51c23"
                                }}>
                                    {currencyFormatter(sumOfTransactions(trans))}
                                </Typography>
                                <ArrowForwardIosIcon sx={{ mr: "20px", color: "rgba(0,0,0,.5)" }} />
                            </ListItem>
                            <Divider sx={{ m: "0 20px" }} />
                        </Stack>
                    )
                }
                </List>
            }

            <CategoryChartDialog
                inflow={inflow}
                dicCategories={dicCategories}
                monthDays={monthDays}
                trans={transForChart}
                open={openCategoryChartDialog}
                setOpen={setOpenCategoryChartDialog} />
        </Stack>
    );
}

export default memo(ReportDetail);