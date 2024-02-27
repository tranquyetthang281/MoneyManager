import { Avatar, Divider, IconButton, Stack, Typography, Box, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import classNames from "classnames/bind";
import styles from './TransactionDetail.module.scss'
import { CURRENCY_UNIT } from "../../utils/constants";
import { memo } from "react";

const cx = classNames.bind(styles)

function TransactionDetail({ transaction, openCloseDetail }) {
    return (
        <Stack sx={{ m: 0, p: 0, width: "100%", height: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <div>
                    <button className={cx('close-btn')} onClick={() => openCloseDetail(false)}>
                        <CloseIcon sx={{ width: "25px", height: "25px" }} />
                    </button>
                    <Typography variant="div" sx={{ fontWeight: 600, fontSize: "2.0rem" }}>Transaction details</Typography>
                </div>

                <div>
                    <button className={cx('btn', 'delete-btn')}>Delete</button>
                    <button className={cx('btn', 'edit-btn')}>Edit</button>
                </div>
            </Stack>
            <Divider />
            <Stack direction="row">
                <Avatar sx={{ m: "20px 20px 0 50px", width: "56px", height: "56px" }} />
                <Stack sx={{ mt: "20px" }}>
                    <Typography sx={{ fontSize: "2.2rem" }}>Rentals</Typography>
                    <Typography sx={{ fontSize: "1.4rem" }}>Love</Typography>
                    <Typography sx={{ fontSize: "1.2rem", mt: "8px", color: "rgb(154,154,154)" }}>Sunday, 28/01/2024</Typography>
                    <Divider primary="Inset below" sx={{ width: 150, alignSelf: "start", height: 10, borderBottomWidth: 2 }} />
                    <Typography variant="h2" sx={{ color: "#e51c23", mt: "10px" }}>-60,000 <u>{CURRENCY_UNIT}</u></Typography>
                </Stack>
            </Stack>
        </Stack >
    );
}

export default memo(TransactionDetail);