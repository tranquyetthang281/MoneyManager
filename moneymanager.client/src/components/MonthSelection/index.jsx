import {
    Avatar, ClickAwayListener, Divider, List, ListItem,
    ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Fragment, memo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MonthSelection.module.scss';
import { CURRENCY_UNIT } from '../../utils/constants';

const cx = classNames.bind(styles)

const listWallets = [
    {
        id: 1,
        name: "Total",
        icon: "total.png",
        balance: "+196,000"
    },
    {
        id: 2,
        name: "Total2",
        icon: "total.png",
        balance: "+196,000"
    },
    {
        id: 3,
        name: "Total3",
        icon: "total.png",
        balance: "+196,000"
    },
    {
        id: 8,
        name: "Total3",
        icon: "total.png",
        balance: "+196,000"
    },
    {
        id: 4,
        name: "Total3",
        icon: "total.png",
        balance: "+196,000"
    },
    {
        id: 5,
        name: "Total3",
        icon: "total.png",
        balance: "+196,000"
    },
    {
        id: 6,
        name: "Total3",
        icon: "total.png",
        balance: "+196,000"
    },
    ,
    {
        id: 7,
        name: "Total3",
        icon: "total.png",
        balance: "+196,000"
    }
]

function MonthSelection() {

    const [currentWallet, setCurrentWallet] = useState(listWallets[0])
    const [isShowingSelection, setIsShowingSelection] = useState(false)

    return (

        <ClickAwayListener onClickAway={() => setIsShowingSelection(false)} >
            <Stack>
                <Tooltip title={<h2>Select Wallet</h2>} arrow>
                    <Stack direction="row" className={cx('wallet')}
                        onClick={() => setIsShowingSelection(prev => !prev)}>
                        <Avatar className={cx('icon')} src={currentWallet.icon} />
                        <Stack direction="column" className={cx('menu')}>
                            <span className={cx('name', 'primary-text')}>
                                {currentWallet.name} &#9662;
                            </span>
                            <span className={cx('balance')}>
                                {currentWallet.balance} <u>{CURRENCY_UNIT}</u>
                            </span>
                        </Stack>
                    </Stack>
                </Tooltip>

                {
                    isShowingSelection &&
                    <Stack className={cx('selection')}>
                        <span className={cx('select-text')}> Select Wallet</span>
                        <Divider />

                        <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                            {
                                listWallets.map((wallet, index) => {
                                    const isCurrent = wallet.id === currentWallet.id
                                    return <Fragment key={index}>
                                        <ListItem
                                            className={cx('wallet-item')}
                                            onClick={() => {
                                                setCurrentWallet(wallet)
                                                setIsShowingSelection(false)
                                            }}>
                                            <ListItemAvatar>
                                                <Avatar src={wallet.icon} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <span className={cx('name-item', isCurrent ? 'primary-text' : null)}>
                                                        {wallet.name}
                                                    </span>
                                                }
                                                secondary={
                                                    <span className={cx('balance-item')}>
                                                        {wallet.balance} <u>{CURRENCY_UNIT}</u>
                                                    </span>
                                                }
                                            />
                                            {
                                                isCurrent &&
                                                <ListItemIcon>
                                                    <DoneIcon color="success" sx={{ fontSize: 25 }} />
                                                </ListItemIcon>
                                            }
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                })
                            }
                        </List>
                    </Stack>
                }
            </Stack>
        </ClickAwayListener>
    );
}

export default memo(MonthSelection);