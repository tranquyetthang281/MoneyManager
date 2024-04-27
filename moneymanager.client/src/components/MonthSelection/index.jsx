import {
    Avatar, ClickAwayListener, Divider, List, ListItem,
    ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip
} from '@mui/material';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MonthSelection.module.scss';
import { getRangeMonths } from '../../utils/getRangeMonths';
import DatePickerDialog from '../DatePickerDialog';
import { useAsyncError } from 'react-router-dom';
import dayjs from 'dayjs';

const cx = classNames.bind(styles)

function MonthSelection({ selectedMonth, setSelectedMonth }) {

    const [isShowingSelection, setIsShowingSelection] = useState(false)
    const [openDatePickerDialog, setOpenDatePickerDialog] = useState(false)
    const [selectedMonthDates, setSelectedMonthDates] = useState('')
    const rangeMonths = useMemo(() => getRangeMonths(new Date()), [])
    useEffect(() => {
        setSelectedMonthDates(getRangeMonths(new Date(selectedMonth))[1])
    }, [selectedMonth])

    return (

        <ClickAwayListener onClickAway={() => setIsShowingSelection(false)} >
            <Stack>
                <Stack direction="row" className={cx('month')}
                    onClick={() => setIsShowingSelection(prev => !prev)}>
                    <Stack direction="column" className={cx('menu')}>
                        <span className={cx('name')}>
                            {selectedMonth.format('MMMM - YYYY')} &#9662;
                        </span>
                        <span className={cx('range-date')}>
                            {selectedMonthDates}
                        </span>
                    </Stack>
                </Stack>

                {
                    isShowingSelection &&
                    <Stack className={cx('selection')}>
                        <Stack direction="row" className={cx('month-item', 'month')}
                            onClick={() => {
                                setSelectedMonth(dayjs())
                                setIsShowingSelection(false)
                            }}>
                            <Stack direction="column" className={cx('menu')}>
                                <span className={cx('name')}>
                                    This month
                                </span>
                                <span className={cx('range-date')}>
                                    {rangeMonths[1]}
                                </span>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" className={cx('month-item', 'month')}
                            onClick={() => {
                                setSelectedMonth(dayjs().month(dayjs().month()-1))
                                setIsShowingSelection(false)
                            }}>
                            <Stack direction="column" className={cx('menu')}>
                                <span className={cx('name')}>
                                    Last month
                                </span>
                                <span className={cx('range-date')}>
                                    {rangeMonths[0]}
                                </span>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" className={cx('select-month')}
                            justifyContent="center" alignItems="center"
                            onClick={() => {
                                setOpenDatePickerDialog(true)
                                setIsShowingSelection(false)
                            }}
                        >
                            <span className={cx('select-text')}>Select month</span>
                        </Stack>
                    </Stack>
                }

                <DatePickerDialog
                    date={selectedMonth}
                    setDate={setSelectedMonth}
                    onlyMonth
                    open={openDatePickerDialog}
                    setOpen={setOpenDatePickerDialog} />
            </Stack>
        </ClickAwayListener>
    );
}

export default memo(MonthSelection);