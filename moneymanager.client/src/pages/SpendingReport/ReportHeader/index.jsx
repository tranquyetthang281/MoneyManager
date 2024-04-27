import classNames from "classnames/bind";
import styles from './ReportHeader.module.scss';
import WalletSelection from "@/components/WalletSelection";
import MonthSelection from "@/components/MonthSelection";

const cx = classNames.bind(styles)

function ReportHeader({ listWallets, selectedWallet, selectWallet, selectedMonth, setSelectedMonth }) {

    return (
        <header className={cx('wrapper')}>
            <div className={cx('wallets')}>
                <WalletSelection
                    listWallets={listWallets}
                    selectedWallet={selectedWallet}
                    selectWallet={selectWallet} />
            </div>
            <div className={cx('months')}>
                <MonthSelection 
                selectedMonth={selectedMonth} 
                setSelectedMonth={setSelectedMonth} />
            </div>
        </header>
    );
}

export default ReportHeader;