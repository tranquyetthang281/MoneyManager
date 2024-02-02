import { Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentsIcon from '@mui/icons-material/Payments';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import styles from "./Sidebar.module.scss";
import SettingDrawer from "../SettingDrawer";

const cx = classNames.bind(styles)

const isCurrentPage = (key, currentPageKey) => key === currentPageKey

function Sidebar() {
    const [currentPageKey, setCurrentPageKey] = useState(1)
    const [isShowingDrawer, setIsShowingDrawer] = useState(false)
    const toggleDrawer = useCallback((isShowing) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsShowingDrawer(isShowing)
    })

    return (
        <div className={cx('wrapper')}>
            <SettingDrawer isShowing={isShowingDrawer} toggleDrawer={toggleDrawer}/>

            <button className={cx('btn')} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ fontSize: 24 }} />
            </button>

            <button className={cx('btn', isCurrentPage(1, currentPageKey) ? 'current' : null)}
                onClick={() => setCurrentPageKey(1)}>
                <Stack alignItems="center">
                    <AccountBalanceWalletIcon sx={{ fontSize: 25 }} />
                    <span className={cx('btn-title')}>Transactions</span>
                </Stack>
            </button>

            <button className={cx('btn', isCurrentPage(2, currentPageKey) ? 'current' : null)}
                onClick={() => setCurrentPageKey(2)}>
                <Stack alignItems="center">
                    <PaymentsIcon sx={{ fontSize: 25 }} />
                    <span className={cx('btn-title')}>Budgets</span>
                </Stack>
            </button>

            <button className={cx('btn', isCurrentPage(3, currentPageKey) ? 'current' : null)}
                onClick={() => setCurrentPageKey(3)}>
                <Stack alignItems="center">
                    <AssessmentIcon sx={{ fontSize: 25 }} />
                    <span className={cx('btn-title')}>Spending</span>
                    <span className={cx('btn-title')}>report</span>
                </Stack>
            </button>

            <button className={cx('btn', isCurrentPage(4, currentPageKey) ? 'current' : null)}
                onClick={() => setCurrentPageKey(4)}>
                <Stack alignItems="center">
                    <WaterfallChartIcon sx={{ fontSize: 25 }} />
                    <span className={cx('btn-title')}>Investment</span>
                </Stack>
            </button>
        </div>
    );
}

export default Sidebar;