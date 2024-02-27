
import { Tooltip } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import classNames from "classnames/bind";
import { useState } from "react";
import styles from './ReportHeader.module.scss';
import WalletSelection from "../WalletSelection";
import MonthSelection from "../MonthSelection";

const cx = classNames.bind(styles)

function ReportHeader() {

    const [viewByTransaction, setViewByTransaction] = useState(true)

    return (
        <header className={cx('wrapper')}>
            <div className={cx('wallets')}>
                <WalletSelection />
            </div>
            <div className={cx('months')}>
                <MonthSelection />
            </div>
        </header>
    );
}

export default ReportHeader;