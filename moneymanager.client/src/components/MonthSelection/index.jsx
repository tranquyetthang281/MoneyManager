import {
    Avatar, ClickAwayListener, Divider, List, ListItem,
    ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip
} from '@mui/material';
import { Fragment, memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MonthSelection.module.scss';

const cx = classNames.bind(styles)

function MonthSelection() {

    const [isShowingSelection, setIsShowingSelection] = useState(false)

    return (

        <ClickAwayListener onClickAway={() => setIsShowingSelection(false)} >
            <Stack>
                <Stack direction="row" className={cx('month')}
                    onClick={() => setIsShowingSelection(prev => !prev)}>
                    <Stack direction="column" className={cx('menu')}>
                        <span className={cx('name')}>
                            This month &#9662;
                        </span>
                        <span className={cx('range-date')}>
                            01/01/2001 - 01/01/2001
                        </span>
                    </Stack>
                </Stack>

                {
                    isShowingSelection &&
                    <Stack className={cx('selection')}>
                        <Stack direction="row" className={cx('month-item', 'month')}
                            onClick={() => setIsShowingSelection(false)}>
                            <Stack direction="column" className={cx('menu')}>
                                <span className={cx('name')}>
                                    This month
                                </span>
                                <span className={cx('range-date')}>
                                    01/01/2001 - 01/01/2001
                                </span>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" className={cx('month-item', 'month')}
                            onClick={() => setIsShowingSelection(false)}>
                            <Stack direction="column" className={cx('menu')}>
                                <span className={cx('name')}>
                                    Last month
                                </span>
                                <span className={cx('range-date')}>
                                    01/01/2001 - 01/01/2001
                                </span>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" className={cx('select-month')}
                            justifyContent="center" alignItems="center"
                            onClick={() => setIsShowingSelection(false)} >
                            <span className={cx('select-text')}>Select month</span>
                        </Stack>
                    </Stack>
                }
            </Stack>
        </ClickAwayListener>
    );
}

export default memo(MonthSelection);