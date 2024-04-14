import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, Grid, TextField, InputBase, Button, DialogActions, Fab, AvatarGroup, Tooltip } from "@mui/material";
import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import styles from "./EditWalletDialog.module.scss";
import AddIcon from '@mui/icons-material/Add';
import { NumericFormat } from 'react-number-format';
import { CURRENCY_UNIT } from '../../../utils/constants'
import MemberSelectionDialog from "../MemberSelectionDialog";

const cx = classNames.bind(styles)

function EditWalletDialog({ userId, wallet, open, openCloseDialog, add }) {

    const [openMemberSelectionDialog, setOpenMemberSelectionDialog] = useState(false)
    const [initBalance, setInitBalance] = useState()
    const [walletName, setWalletName] = useState('')
    const [listMembers, setListMembers] = useState([])
    const [listFriends, setListFriends] = useState([])
    const [addMember, setAddMember] = useState(false)
    const [enableToSave, setEnableToSave] = useState(false)
    const openCloseMemberSelectionDialog = useCallback((open) => setOpenMemberSelectionDialog(open), [])

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseDialog(false);
    }

    useEffect(() => {
        if (open) {
            if (wallet) {
                setWalletName(wallet.name)
                setInitBalance(wallet.balance)
            }
            else {
                setWalletName('')
                setInitBalance(null)
            }
        }
    }, [wallet, open])

    useEffect(() => {
        setEnableToSave(walletName && initBalance)
    }, [walletName, initBalance, open])

    useEffect(() => {
        const friends = [
            {
                name: 'tran quyet cu',
                email: 'thaybounguat@gmail.com'
            },
            {
                name: 'tran quyet cu',
                email: 'thaybounguat@gmail.com'
            },
            {
                name: 'tran quyet cu',
                email: 'thaybounguat@gmail.com'
            },
            {
                name: 'tran quyet cu',
                email: 'thaybounguat@gmail.com'
            },
            {
                name: 'tran quyet cu',
                email: 'thaybounguat@gmail.com'
            },
        ]
        setListMembers(friends)
        setListFriends(friends)
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 1008,
                    maxHeight: 362
                }
            }}>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                {add ? "Add wallet" : "Edit wallet"}
            </DialogTitle>

            <DialogContent dividers className={cx('content')}>
                <Stack direction='column'>
                    <Stack direction='row'>
                        <Stack className={cx('owner')}>
                            <Typography className={cx('select-title')}>
                                Owner
                            </Typography>
                            <Stack direction='row' alignItems='center'>
                                <Avatar className={cx('owner-avatar')} sx={{ mr: '10px' }} />
                                <Stack >
                                    <Typography className={cx('owner-name')}>Tran Thang</Typography>
                                    <Typography className={cx('owner-email')}>tranquyetthang281@gmail.com</Typography>
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems="flex-start" className={cx('select-friend')}>
                            <Typography className={cx('select-title')}>Members</Typography>
                            {/* <InputBase className={cx('input-note')} value={"haha"} onChange={e => {
                                setNote(e.target.value)
                            }} placeholder="Wallet name" /> */}
                            <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%' onClick={() => {
                                setAddMember(false)
                                openCloseMemberSelectionDialog(true)
                            }}>
                                <AvatarGroup max={10}>
                                    <Tooltip title={<h2>Member name</h2>} arrow>
                                        <Avatar className={cx('select-avatar')} />
                                    </Tooltip>
                                    <Tooltip title={<h2>Member name</h2>} arrow>
                                        <Avatar className={cx('select-avatar')} />
                                    </Tooltip>
                                    <Tooltip title={<h2>Member name</h2>} arrow>
                                        <Avatar className={cx('select-avatar')} />
                                    </Tooltip>
                                    <Tooltip title={<h2>Member name</h2>} arrow>
                                        <Avatar className={cx('select-avatar')} />
                                    </Tooltip>
                                </AvatarGroup>

                                <Tooltip title={<h2>Add friend to wallet</h2>} arrow>
                                    <IconButton color="primary" aria-label="add" className={cx('add-friend-btn')} onClick={(e) => {
                                        setAddMember(true)
                                        openCloseMemberSelectionDialog(true)
                                        e.stopPropagation();
                                    }}>
                                        <AddIcon sx={{ fontSize: 26 }} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction='row'>
                        <Stack alignItems="flex-start" className={cx('select-name')}>
                            <Typography className={cx('select-title')}>Wallet name</Typography>
                            <InputBase className={cx('input-name')} value={walletName} onChange={e => {
                                setWalletName(e.target.value)
                            }} placeholder="Enter name" />
                        </Stack>

                        <Stack alignItems="flex-start" className={cx(add ? 'select-amount' : 'un-active-select')}>
                            <Typography className={cx('select-title')}>Initial balance</Typography>
                            <NumericFormat className={cx('input-amount')} placeholder={CURRENCY_UNIT} decimalScale={0}
                                thousandsGroupStyle="thousand" thousandSeparator="," suffix={` ${CURRENCY_UNIT}`} value={add ? null : initBalance} onValueChange={(values, _) => setInitBalance(values.value)} disabled={!add} />
                        </Stack>
                    </Stack>
                    
                    <MemberSelectionDialog listMembers={listMembers} listFriends={listFriends} walletName={wallet ? wallet.name : null} add={addMember} open={openMemberSelectionDialog} openCloseDialog={openCloseMemberSelectionDialog}/>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button className={cx('btn', 'cancel-btn')}
                    onClick={() => openCloseDialog(false)}>
                    Cancel
                </Button>
                <Button className={cx('btn', enableToSave ? 'save-btn' : 'un-active-saving')} disabled={!enableToSave} onClick={() => {
                    openCloseDialog(false)
                    handleSavingChange()
                }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default memo(EditWalletDialog);