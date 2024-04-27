import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { memo, useEffect, useMemo, useState } from "react";
import dateFormat from "dateformat";
import { BarChart } from "@mui/x-charts";
import { ChartsGrid } from '@mui/x-charts';
import currencyFormatter, { currencyFormatterByK } from "@/utils/currencyFormatter";
import ListTransactions from "../ListTransactions";

function CategoryChartDialog({ dicCategories, inflow, trans, monthDays, open, setOpen }) {
  
    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)

    const sumOfTransactions = (transactions) =>
        transactions.reduce((n, { amount }) => n + amount, 0)

    useEffect(() => {
        if (trans.length > 0 && monthDays.length > 0) {
            const data = Array(monthDays.length).fill(0)
            trans.forEach(tran => {
                const date = dateFormat(tran.date, 'd')
                data[date - 1] += (tran.amount / 1000)
            })
            setData(data)
            setTotal(sumOfTransactions(trans))
        }
    }, [trans, monthDays])

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 800,
                    height: 900
                }
            }}>

            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                {dicCategories && data.length > 0 ? dicCategories[trans[0].categoryId].name : ''}
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0 }}>
                <Stack width='100%'>
                    <Stack width="100%" sx={{ p: "0 20px" }} alignItems='center'>
                        <Typography sx={{fontWeight:600, fontSize:'20px', mt:'10px'}}>Total: {currencyFormatter(total)}</Typography>
                        {
                            data.length > 0 &&
                            <BarChart
                                series={[
                                    { data: data, label: inflow ? 'Inflow' : 'Outflow', valueFormatter: currencyFormatterByK },
                                ]}
                                xAxis={[{ scaleType: 'band', data: monthDays }]}
                                yAxis={[{ reverse: !inflow }]}
                                height={300}
                                colors={[inflow ? '#039be5' : '#e51c23']}
                                slotProps={{ legend: { hidden: true } }}
                                grid={{horizontal: true}}
                            />}
                    </Stack>

                    <ListTransactions
                        dicCategories={dicCategories}
                        listTrans={trans}
                    />
                </Stack>
            </DialogContent>

        </Dialog>
    );
}

export default memo(CategoryChartDialog);