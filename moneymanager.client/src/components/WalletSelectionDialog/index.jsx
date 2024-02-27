import { Avatar, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, stepLabelClasses } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, memo, useState } from "react";
import { CURRENCY_UNIT } from "../../utils/constants";
import classNames from "classnames/bind";
import styles from "./WalletSelectionDialog.module.scss"

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

function WalletSelectionDialog({ open, openCloseDialog }) {
    const [currentWallet, setCurrentWallet] = useState(null)

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseDialog(false);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 510,
                    height: 600
                }
            }}>

            <IconButton
                aria-label="close"
                onClick={() => openCloseDialog(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "2.0rem", fontWeight: 600 }}>
                Select Wallet
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0 }}>
                <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                    {
                        listWallets.map((wallet, index) => {
                            const isCurrent = currentWallet && wallet.id === currentWallet.id

                            return <Fragment key={index}>
                                <ListItem
                                    className={cx('wallet-item')}
                                    onClick={() => {
                                        setCurrentWallet(wallet)
                                        openCloseDialog(false)
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
            </DialogContent>
        </Dialog>
    );
}

export default memo(WalletSelectionDialog);