import { Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentsIcon from '@mui/icons-material/Payments';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import SettingDrawer from "../SettingDrawer";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

const isCurrentPage = (key, currentPageKey) => key === currentPageKey

function Sidebar() {
    const [currentPageKey, setCurrentPageKey] = useState(-1)
    const [isShowingDrawer, setIsShowingDrawer] = useState(false)
    const toggleDrawer = useCallback((isShowing) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsShowingDrawer(isShowing)
    }, [])

    useEffect(() => {
        const href = window.location.href
        if (href.includes('budgets')) {
            setCurrentPageKey(1)
        }
        else if (href.includes('spending-report')) {
            setCurrentPageKey(2)
        }
        else {
            setCurrentPageKey(0)
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <SettingDrawer isShowing={isShowingDrawer} toggleDrawer={toggleDrawer} />

            <button className={cx('btn')} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: 24 }} />
            </button>

            <Link to="/">
                <button className={cx('btn', isCurrentPage(0, currentPageKey) ? 'current' : null)}
                    onClick={() => setCurrentPageKey(0)}>
                    <Stack alignItems="center">
                        <AccountBalanceWalletIcon sx={{ fontSize: 25 }} />
                        <span className={cx('btn-title')}>Transactions</span>
                    </Stack>
                </button>
            </Link>

            {/* <Link to="/budgets">
                <button className={cx('btn', isCurrentPage(1, currentPageKey) ? 'current' : null)}
                    onClick={() => setCurrentPageKey(1)}>
                    <Stack alignItems="center">
                        <PaymentsIcon sx={{ fontSize: 25 }} />
                        <span className={cx('btn-title')}>Budgets</span>
                    </Stack>
                </button>
            </Link> */}

            <Link to="/spending-report">
                <button className={cx('btn', isCurrentPage(2, currentPageKey) ? 'current' : null)}
                    onClick={() => setCurrentPageKey(2)}>
                    <Stack alignItems="center">
                        <AssessmentIcon sx={{ fontSize: 25 }} />
                        <span className={cx('btn-title')}>Spending</span>
                        <span className={cx('btn-title')}>report</span>
                    </Stack>
                </button>
            </Link>

            {/* <button className={cx('btn', isCurrentPage(3, currentPageKey) ? 'current' : null)}
                onClick={() => setCurrentPageKey(3)}>
                <Stack alignItems="center">
                    <WaterfallChartIcon sx={{ fontSize: 25 }} />
                    <span className={cx('btn-title')}>Investment</span>
                </Stack>
            </button> */}
        </div>
    );
}

export default Sidebar;