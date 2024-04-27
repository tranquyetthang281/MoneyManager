import classNames from "classnames/bind";
import styles from "./MyWallets.module.scss"
import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack, Divider, ListItemIcon, Tooltip, Fab } from "@mui/material";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { userService, walletService } from "@/apiServices"
import currencyFormatter from "@/utils/currencyFormatter";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from "@/components/AuthProvider";
import EditWalletDialog from "./EditWalletDialog";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";

const cx = classNames.bind(styles)

function MyWallets() {
    const { auth } = useContext(AuthContext)
    const [user, setUser] = useState()
    const [wallets, setWallets] = useState([])
    const [openEditWalletDialog, setOpenEditWalletDialog] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState()
    const [addNewWallet, setAddNewWallet] = useState(true)
    const showErrorSnackbar = useErrorSnackbar()

    const reloadWallets = useCallback(() => {
        walletService.getAllWalletsForUser(auth.userId, auth.accessToken)
            .then(result => {
                setWallets(result)
            })
            .catch(e => showErrorSnackbar(e.message))
    }, [])

    useEffect(() => {
        walletService.getAllWalletsForUser(auth.userId, auth.accessToken)
            .then(result => {
                setWallets(result)
            })
            .catch(e => showErrorSnackbar(e.message))

        userService.getUser(auth.userId, auth.accessToken)
            .then(result => {
                setUser(result)
            })
            .catch(e => showErrorSnackbar(e.message))
    }, [])

    return (
        <Stack className={cx('wrapper')} direction={'row'}>
            <Stack className={cx('wallets-list')}>
                {
                    wallets.map((wallet, index) => {
                        if (index > 0) {
                            return <Fragment key={index}>
                                <ListItem className={cx('wallet-item')}>
                                    <ListItemAvatar >
                                        <Avatar className={cx('wallet-icon')} src={wallet.avatar} />
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
                                        <Tooltip arrow title={<h3>Edit</h3>}>
                                            <EditIcon className={cx('edit-icon')} onClick={() => {
                                                setSelectedWallet(wallet)
                                                setAddNewWallet(false)
                                                setOpenEditWalletDialog(true)
                                            }} />
                                        </Tooltip>
                                    </ListItemIcon>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        }
                    })
                }
            </Stack>
            <Tooltip title={<h3>Add wallet</h3>} arrow>
                <Fab color="primary" aria-label="add" className={cx('add-wallet-btn')}
                    onClick={() => {
                        setSelectedWallet(null)
                        setAddNewWallet(true)
                        setOpenEditWalletDialog(true)
                    }}>
                    <AddIcon sx={{ fontSize: 26 }} />
                </Fab>
            </Tooltip>

            <EditWalletDialog
                user={user}
                wallet={selectedWallet}
                add={addNewWallet}
                reloadWallets={reloadWallets}
                open={openEditWalletDialog}
                setOpen={setOpenEditWalletDialog} />
        </Stack>
    );
}

export default MyWallets;