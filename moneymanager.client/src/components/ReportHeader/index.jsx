import classNames from "classnames/bind";
import styles from './ReportHeader.module.scss';
import WalletSelection from "../WalletSelection";
import MonthSelection from "../MonthSelection";

const cx = classNames.bind(styles)

function ReportHeader() {

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