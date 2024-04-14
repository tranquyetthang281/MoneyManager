import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, List, ListItem, ListItemAvatar, Divider, ListItemText, Button, DialogActions, DialogContentText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import classNames from "classnames/bind";
import { Fragment, memo, useEffect, useState } from "react";
import styles from "./MemberSelectionDialog.module.scss"

const cx = classNames.bind(styles)

function MemberSelectionDialog({ listMembers, listFriends, add, walletName, open, openCloseDialog }) {

    const [addMember, setAddMember] = useState(false)
    const [openConfirmAdding, setOpenConfirmAdding] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState()

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseDialog(false);
    }

    const closeConfirmAdding = () => setOpenConfirmAdding(false)

    useEffect(() => {
        console.log(add)
        setAddMember(add)
    }, [open])

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 510,
                    height: 680
                }
            }}>

            <IconButton
                aria-label="close"
                onClick={() => openCloseDialog(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                Wallet members
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Stack sx={{ width: '100%' }}>
                    <Stack className={cx('select')} direction="row">
                        <button className={cx('select-btn', addMember ? null : 'selected-btn')}
                            onClick={() => setAddMember(false)}>Wallet members</button>
                        <button className={cx('select-btn', addMember ? 'selected-btn' : null)}
                            onClick={() => setAddMember(true)}>Add friend to wallet</button>
                    </Stack>

                    <Stack>
                        <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                            {
                                (addMember ? listFriends : listMembers).map((friend, index) => {

                                    return <Fragment key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={''} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography className={cx('friend-name')}>
                                                        {friend.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography className={cx('friend-email')}>
                                                        {friend.email}
                                                    </Typography>
                                                }
                                            />
                                            {
                                                addMember &&
                                                <button className={cx('add-btn')} onClick={() => {
                                                    setSelectedFriend(friend)
                                                    setOpenConfirmAdding(true)
                                                }}>
                                                    Add to wallet
                                                </button>
                                            }
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                })
                            }
                        </List>
                    </Stack>
                </Stack>
            </DialogContent>
            {
                selectedFriend &&
                <Dialog
                    open={openConfirmAdding}
                    onClose={closeConfirmAdding}>
                    <DialogTitle>
                        {"Confirm adding member to wallet"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Are you sure add ${selectedFriend.name} to ${walletName || 'new'} wallet?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className={cx('yes-no-btn', 'no-btn')} onClick={closeConfirmAdding} autoFocus>No</Button>
                        <Button className={cx('yes-no-btn')} onClick={closeConfirmAdding}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </Dialog>
    );
}

export default memo(MemberSelectionDialog);