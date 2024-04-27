import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, List, ListItem, ListItemAvatar, Divider, ListItemText, Button, DialogActions, DialogContentText, ListItemIcon } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import classNames from "classnames/bind";
import { Fragment, memo, useContext, useEffect, useMemo, useState } from "react";
import { WALLET_AVATARS_COUNT } from '@/utils/constants'
import styles from './WalletAvatarSelectionDialog.module.scss'

const cx = classNames.bind(styles)

function WalletAvatarSelectionDialog({ avatar, setAvatar, open, setOpen }) {

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    const walletAvatars = useMemo(() =>
        Array.from({ length: WALLET_AVATARS_COUNT }, (_, i) => `/wallet${i + 1}.png`)
        , [])

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 400,
                    height: 680
                }
            }}>

            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                Wallet avatar
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Stack sx={{ width: '100%' }}>
                    <Stack>
                        <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                            {
                                walletAvatars.map((item, index) =>
                                    <Fragment key={index}>
                                        <ListItem className={cx('avatar-item')}
                                            onClick={() => {
                                                setOpen(false)
                                                setAvatar(item)
                                            }}>
                                            <Avatar className={cx('avatar')} src={item} />
                                            {
                                                item === avatar &&
                                                <ListItemIcon>
                                                    <CheckIcon sx={{ color: 'rgba(45, 184, 76)' }} />
                                                </ListItemIcon>
                                            }
                                        </ListItem>
                                        <Divider component='li' />
                                    </Fragment>
                                )
                            }
                        </List>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default memo(WalletAvatarSelectionDialog)