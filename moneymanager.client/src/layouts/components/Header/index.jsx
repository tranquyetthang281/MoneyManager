import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss"

const cx = classNames.bind(styles)

function Header() {

    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const href = window.location.href
        if (href.includes('my-wallets')) {
            setTitle('My wallets')
        } else if (href.includes('account')) {
            setTitle('My account')
        }
    }, [])

    return (
        <Stack className={cx('wrapper')} direction={"row"} alignItems={"center"}>
            <IconButton className={cx('back-btn')} onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <Typography className={cx('title')}>{title}</Typography>
        </Stack>);
}

export default Header;