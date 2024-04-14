import { IconButton, Stack, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const cx = classNames.bind(styles)

function Header() {

    const [title, setTitle] = useState('')

    useEffect(() => {
        const href = window.location.href
        if (href.includes('my-wallets')) {
            setTitle('My wallets')
        }
    }, [])



    return (
        <Stack className={cx('wrapper')} direction={"row"} alignItems={"center"}>
            <IconButton className={cx('back-btn')}>
                <ArrowBackIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <Typography className={cx('title')}>{title}</Typography>
        </Stack>);
}

export default Header;