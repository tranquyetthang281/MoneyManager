import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, Grid, TextField, InputBase, Button, ListItemIcon, List, ListItem, ListItemAvatar, Divider, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { memo, useMemo } from "react";
import { BarChart } from "@mui/x-charts";
import { CURRENCY_UNIT } from "../../utils/constants";

const data = [
    0, 12, 65, 120, 150, 60, 520, 630, 123, 1,
    0, 12, 65, 120, 150, 60, 520, 630, 123, 1,
    0, 12, 65, 120, 150, 60, 520, 630, 123, 1000,
]

function CategoryChartDialog({ open, openCloseDialog, inflow }) {
    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseDialog(false);
    }

    const moneyFormatter = (value) => `${value}k ${CURRENCY_UNIT}`;
    const monthData = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 600,
                    height: 700
                }
            }}>

            <IconButton
                aria-label="close"
                onClick={() => openCloseDialog(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "2.0rem", fontWeight: 600 }}>
                Salary
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0 }}>
                <Stack sx={{ width: '100%' }}>
                    <Stack width="100%" sx={{ p: "0 20px" }}>
                        <BarChart
                            series={[
                                { data: data, label: inflow ? 'Inflow' : 'Outflow', valueFormatter: moneyFormatter },
                            ]}
                            xAxis={[{ scaleType: 'band', data: monthData }]}
                            height={300}
                            colors={[inflow ? '#039be5' : '#e51c23']}
                            slotProps={{ legend: { hidden: true } }}
                        />
                    </Stack>
                </Stack>
            </DialogContent>

        </Dialog>
    );
}

export default memo(CategoryChartDialog);