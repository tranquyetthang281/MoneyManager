import { Avatar, ClickAwayListener, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Fragment, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './WalletSelection.module.scss';
import currencyFormatter from '@/utils/currencyFormatter';

const cx = classNames.bind(styles)

function WalletSelection({ listWallets, selectedWallet, selectWallet }) {

    const [isShowingSelection, setIsShowingSelection] = useState(false)
    const negative = useNavigate()

    const onChangeSelection = (index, wallet) => {
        selectWallet(wallet)
        setIsShowingSelection(false)
        const href = window.location.href
        if (index === 0) {
            if (href.includes('spending-report')) {
                negative('/spending-report')
            } else {
                negative('/')
            }
        }
        else {
            if (href.includes('spending-report')) {
                negative(`/spending-report/wallet/${wallet.id}`)
            } else {
                negative(`/wallet/${wallet.id}`)
            }
        }
    }

    return (
        <ClickAwayListener onClickAway={() => setIsShowingSelection(false)} >
            <Stack>
                {
                    selectedWallet &&
                    <Tooltip title={<h3>Select Wallet</h3>} arrow>
                        <Stack direction="row" className={cx('wallet')}
                            onClick={() => setIsShowingSelection(prev => !prev)}>
                            <Avatar className={cx('icon')} src={selectedWallet.avatar} />
                            <Stack direction="column" className={cx('menu')}>
                                <span className={cx('name', 'primary-text')}>
                                    {selectedWallet.name} &#9662;
                                </span>
                                <span className={cx('balance')}>
                                    {currencyFormatter(selectedWallet.userBalance)}
                                </span>
                            </Stack>
                        </Stack>
                    </Tooltip>
                }

                {
                    isShowingSelection &&
                    <Stack className={cx('selection')}>
                        <span className={cx('select-text')}> Select Wallet</span>
                        <Divider />

                        <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                            {
                                listWallets.map((wallet, index) => {
                                    const isSelected = wallet.id === selectedWallet.id
                                    return <Fragment key={index}>
                                        <ListItem
                                            className={cx('wallet-item')}
                                            onClick={() => onChangeSelection(index, wallet)}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ width: '48px', height: '48px', mr: '15px' }} src={wallet.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <span className={cx('name-item', isSelected ? 'primary-text' : null)}>
                                                        {wallet.name}
                                                    </span>
                                                }
                                                secondary={
                                                    <span className={cx('balance-item')}>
                                                        {currencyFormatter(wallet.userBalance)}
                                                    </span>
                                                }
                                            />
                                            {
                                                isSelected &&
                                                <ListItemIcon>
                                                    <DoneIcon color="success" sx={{ fontSize: 25 }} />
                                                </ListItemIcon>
                                            }
                                        </ListItem>
                                        <Divider component="li" />

                                        {
                                            index == 0 &&
                                            <Fragment>
                                                <Typography sx={{ fontSize: "14px", m: "10px 10px 10px 20px" }}>
                                                    Included in Total
                                                </Typography>
                                                <Divider />
                                            </Fragment>
                                        }
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

export default memo(WalletSelection);