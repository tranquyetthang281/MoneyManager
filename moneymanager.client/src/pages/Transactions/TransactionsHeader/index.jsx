
import { Tooltip } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import classNames from "classnames/bind";
import { useState, memo } from "react";
import styles from './TransactionsHeader.module.scss';
import WalletSelection from '@/components/WalletSelection';

const cx = classNames.bind(styles)

function TransactionsHeader({ listWallets, selectedWallet, selectWallet }) {

    const [viewByTransaction, setViewByTransaction] = useState(true)

    return (
        <header className={cx('wrapper')}>
            <div className={cx('wallets')}>
                <WalletSelection listWallets={listWallets} selectedWallet={selectedWallet} selectWallet={selectWallet} />
            </div>

            <div className={cx('icons')}>
                <Tooltip title={<h2>Jump to today</h2>} arrow>
                    <button className={cx('btn')}>
                        <CalendarTodayIcon sx={{ fontSize: 25 }} />
                    </button>
                </Tooltip>

                <Tooltip title={viewByTransaction ? <h2>View by transaction</h2>
                    : <h2>View by category</h2>} arrow>
                    <button className={cx('btn')} onClick={() => setViewByTransaction(!viewByTransaction)}>
                        {viewByTransaction ? <ReceiptLongIcon sx={{ fontSize: 25 }} />
                            : <CategoryIcon sx={{ fontSize: 25 }} />}
                    </button>
                </Tooltip>

                <Tooltip title={<h2>Search transactions</h2>} arrow>
                    <button className={cx('btn')}>
                        <SearchIcon sx={{ fontSize: 25 }} />
                    </button>
                </Tooltip>
            </div>
        </header>
    );
}

export default memo(TransactionsHeader);