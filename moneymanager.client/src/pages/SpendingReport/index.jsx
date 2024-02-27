import { Fragment } from "react";
import classNames from "classnames/bind";
import ReportHeader from "../../components/ReportHeader";
import styles from "./SpendingReport.module.scss"
import { Stack } from "@mui/material";

const cx = classNames.bind(styles)

function SpendingReport() {
    return (
        <Fragment>
            <ReportHeader />
            <Stack className={cx('wrapper')} justifyContent="center" direction="row">
                <Stack className={cx('reports')}>

                    {/* <Stack className={cx('transaction-detail', isShowingDetail ? 'transaction-detail-show' : null)}>
                            <TransactionDetail openCloseDetail={openCloseDetail} />
                        </Stack>

                        <Tooltip title={<h2>Add transaction</h2>} arrow>
                            <Fab color="primary" aria-label="add" className={cx('add-transaction-btn')}
                                onClick={() => openCloseEditDialog(true)}>
                                <AddIcon sx={{ fontSize: 26 }} />
                            </Fab>
                        </Tooltip> */}
                </Stack>
            </Stack>
        </Fragment>
    );
}

export default SpendingReport;