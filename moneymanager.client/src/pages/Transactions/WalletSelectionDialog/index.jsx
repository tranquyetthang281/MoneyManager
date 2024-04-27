import { Avatar, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, memo } from "react";
import classNames from "classnames/bind";
import styles from "./WalletSelectionDialog.module.scss"
import currencyFormatter from "@/utils/currencyFormatter";

const cx = classNames.bind(styles)

function WalletSelectionDialog({ listWallets, selectedWallet, setSelectedWallet, open, setOpen }) {

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
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
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                Select Wallet
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0 }}>
                <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                    {
                        listWallets.map((wallet, index) => {
                            if (index > 0) {
                                const isSelected = selectedWallet && wallet.id === selectedWallet.id

                                return <Fragment key={index}>
                                    <ListItem
                                        className={cx('wallet-item')}
                                        onClick={() => {
                                            setSelectedWallet(wallet)
                                            setOpen(false)
                                        }}>
                                        <ListItemAvatar>
                                            <Avatar src={wallet.avatar} />
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
                                </Fragment>
                            }
                        })
                    }
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default memo(WalletSelectionDialog);