import classNames from "classnames/bind";
import styles from "./MyWallets.module.scss"
import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack, Divider, ListItemIcon, Tooltip, Typography, Fab } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import * as walletService from "../../apiServices/services/walletService"
import currencyFormatter from "../../utils/currencyFormatter";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EditWalletDialog from "./EditWalletDialog";

const cx = classNames.bind(styles)

const userId = 'c9d4c053-49b6-410c-bc78-2d54a9991870'
// const userId = '3d490a70-94ce-4d15-9494-5248280c2ce3'

function MyWallets() {
    const [wallets, setWallets] = useState([])
    const [openEditWalletDialog, setOpenEditWalletDialog] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState()
    const [addNewWallet, setAddNewWallet] = useState(true)
    const openCloseEditWalletDialog = useCallback((open) => setOpenEditWalletDialog(open), [])

    useEffect(() => {
        walletService.getAllWalletsForUser(userId)
            .then(result => {
                setWallets(result)
            })

    }, [])

    return (
        <Stack className={cx('wrapper')} direction={'row'}>
            <Stack className={cx('wallets-list')}>
                {
                    wallets.map((wallet, index) =>
                        <Fragment key={index}>
                            <ListItem className={cx('wallet-item')}>
                                <ListItemAvatar >
                                    <Avatar className={cx('wallet-icon')} src={''} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <span className={cx('name-item')}>
                                            {wallet.name}
                                        </span>
                                    }
                                    secondary={
                                        <span className={cx('balance-item')}>
                                            {currencyFormatter(wallet.userBalance)}
                                        </span>
                                    }
                                />
                                <ListItemIcon>
                                    <Tooltip arrow title={<h2>Edit</h2>}>
                                        <EditIcon className={cx('edit-icon')} onClick={() => {
                                            setSelectedWallet(wallet)
                                            setAddNewWallet(false)
                                            openCloseEditWalletDialog(true)
                                        }} />
                                    </Tooltip>
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    )
                }
            </Stack>
            <Tooltip title={<h2>Add wallet</h2>} arrow>
                <Fab color="primary" aria-label="add" className={cx('add-wallet-btn')}
                    onClick={() => {
                        setSelectedWallet(null)
                        setAddNewWallet(true)
                        openCloseEditWalletDialog(true)
                    }}>
                    <AddIcon sx={{ fontSize: 26 }} />
                </Fab>
            </Tooltip>

            <EditWalletDialog wallet={selectedWallet} add={addNewWallet} open={openEditWalletDialog} openCloseDialog={openCloseEditWalletDialog} />
        </Stack>
    );
}

export default MyWallets;