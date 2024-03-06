import classNames from "classnames/bind";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./ReportDetail.module.scss"
import { memo, useCallback, useState } from "react";
import { Stack, Typography, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { CURRENCY_UNIT } from "../../utils/constants";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryChartDialog from "../CategoryChartDialog";

const cx = classNames.bind(styles)

const categoryReports = [
    {
        name: 'salary',
        amount: '-6,000,000'
    },
    {
        name: 'salary',
        amount: '-6,000,000'
    },
    {
        name: 'salary',
        amount: '-6,000,000'
    },
    {
        name: 'salary',
        amount: '-6,000,000'
    },
    {
        name: 'salary',
        amount: '-6,000,000'
    },
    {
        name: 'salary',
        amount: '-6,000,000'
    },
]

function ReportDetail({ openCloseDetail, inflow }) {
    const [openCategoryChartDialog, setOpenCategoryChartDialog] = useState(false)
    const openCloseCategoryChartDialog = useCallback((open) => setOpenCategoryChartDialog(open))

    return (
        <Stack sx={{ m: 0, p: 0, w: "100%", h: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div>
                    <button className={cx('close-btn')} onClick={() => openCloseDetail(false)}>
                        <CloseIcon sx={{ width: "25px", height: "25px" }} />
                    </button>
                    <Typography variant="div" sx={{ fontWeight: 600, fontSize: "2.0rem" }}>
                        {inflow ? "Inflow" : "Outflow"}
                    </Typography>
                </div>
                <Typography sx={{ color: inflow ? '#039be5' : '#e51c23', fontSize: "1.6rem", fontWeight: 600, mr: "20px" }}>-6,800,000,000 <u>{CURRENCY_UNIT}</u></Typography>
            </Stack>
            <Divider sx={{ mb: "20px" }} />
            <Stack>
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
            <Divider sx={{ m: "20px 0 0 0" }} />
            <List sx={{ m: 0, p: 0 }}> {
                categoryReports.map((category, index) =>
                    <Stack>
                        <ListItem key={index} onClick={() => openCloseCategoryChartDialog(true)}
                            sx={{
                                p: 0, m: 0, "&:hover": {
                                    background: "rgba(45, 184, 76, .1)",
                                    cursor: "pointer"
                                }
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ m: "15px" }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>{category.name}</Typography>
                                }
                            >
                            </ListItemText>
                            <Typography sx={{
                                fontSize: "1.4rem", m: "20px",
                                color: category.type === 1 ? "#039be5" : "#e51c23"
                            }}>
                                {category.amount} <u>{CURRENCY_UNIT}</u>
                            </Typography>
                            <ArrowForwardIosIcon sx={{ mr: "20px", color: "rgba(0,0,0,.5)" }} />
                        </ListItem>
                        <Divider sx={{ m: "0 20px" }} />
                    </Stack>
                )
            }
            </List>
            <CategoryChartDialog open={openCategoryChartDialog} openCloseDialog={openCloseCategoryChartDialog}/>
        </Stack>
    );
}

export default memo(ReportDetail);