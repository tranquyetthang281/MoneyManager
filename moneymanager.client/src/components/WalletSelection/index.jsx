import {
    Avatar, ClickAwayListener, Divider, List, ListItem,
    ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip, Typography
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Fragment, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './WalletSelection.module.scss';
import currencyFormatter from '../../utils/currencyFormatter';

const cx = classNames.bind(styles)

function WalletSelection({ listWallets, selectedWallet, selectWallet }) {

    const [isShowingSelection, setIsShowingSelection] = useState(false)
    const negative = useNavigate()

    return (
        <ClickAwayListener onClickAway={() => setIsShowingSelection(false)} >
            <Stack>
                {
                    selectedWallet &&
                    <Tooltip title={<h2>Select Wallet</h2>} arrow>
                        <Stack direction="row" className={cx('wallet')}
                            onClick={() => setIsShowingSelection(prev => !prev)}>
                            <Avatar className={cx('icon')} src={''} />
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
                                            onClick={() => {
                                                selectWallet(wallet)
                                                setIsShowingSelection(false)
                                                if (index === 0) {
                                                    negative('/')
                                                }
                                                else {
                                                    negative(`/wallet/${wallet.id}`)
                                                }
                                            }}>
                                            <ListItemAvatar>
                                                <Avatar src={''} />
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