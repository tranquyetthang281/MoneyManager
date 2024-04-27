
import { Tooltip } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import classNames from "classnames/bind";
import { useState, memo, useContext, useCallback } from "react";
import styles from './TransactionsHeader.module.scss';
import WalletSelection from '@/components/WalletSelection';
import { TransactionsPageContext } from "../TransactionsPageProvider";

const cx = classNames.bind(styles)

function TransactionsHeader() {

    const [viewByTransaction, setViewByTransaction] = useState(true)
    const {
        listWallets,
        selectedWallet,
        setSelectedWallet,
        setCenterMonth } = useContext(TransactionsPageContext)
    const selectWallet = useCallback(wallet => setSelectedWallet(wallet), [])

    return (
        <header className={cx('wrapper')}>
            <div className={cx('wallets')}>
                <WalletSelection
                    listWallets={listWallets}
                    selectedWallet={selectedWallet}
                    selectWallet={selectWallet} />
            </div>

            <div className={cx('icons')}>
                <Tooltip title={<h3>Jump to this month</h3>} arrow>
                    <button className={cx('btn')} onClick={() => setCenterMonth(new Date())}>
                        <CalendarTodayIcon sx={{ fontSize: 25 }} />
                    </button>
                </Tooltip>

                {/* <Tooltip title={viewByTransaction ? <h3>View by transaction</h3>
                    : <h3>View by category</h3>} arrow>
                    <button className={cx('btn')} onClick={() => setViewByTransaction(!viewByTransaction)}>
                        {viewByTransaction ? <ReceiptLongIcon sx={{ fontSize: 25 }} />
                            : <CategoryIcon sx={{ fontSize: 25 }} />}
                    </button>
                </Tooltip>

                <Tooltip title={<h3>Search transactions</h3>} arrow>
                    <button className={cx('btn')}>
                        <SearchIcon sx={{ fontSize: 25 }} />
                    </button>
    </Tooltip>*/}
            </div>
        </header>
    );
}

export default memo(TransactionsHeader);