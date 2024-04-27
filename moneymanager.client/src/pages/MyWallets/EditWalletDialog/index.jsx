import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, Grid, TextField, InputBase, Button, DialogActions, AvatarGroup, Tooltip } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classNames from "classnames/bind";
import { NumericFormat } from 'react-number-format';
import { Fragment, memo, useContext, useEffect, useState } from "react";
import styles from "./EditWalletDialog.module.scss";
import AddIcon from '@mui/icons-material/Add';
import { CURRENCY_UNIT } from '@/utils/constants'
import { walletService } from "@/apiServices";
import { AuthContext } from "@/components/AuthProvider";
import MemberSelectionDialog from "../MemberSelectionDialog";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";
import WalletAvatarSelectionDialog from "../WalletAvatarSelectionDialog";

const cx = classNames.bind(styles)

function EditWalletDialog({ user, wallet, open, setOpen, reloadWallets, add }) {

    const { auth } = useContext(AuthContext)
    const [openMemberSelectionDialog, setOpenMemberSelectionDialog] = useState(false)
    const [openWalletAvatarSelectionDialog, setOpenWalletAvatarSelectionDialog] = useState(false)
    const [initBalance, setInitBalance] = useState()
    const [walletName, setWalletName] = useState('')
    const [listMembers, setListMembers] = useState([])
    const [listFriends, setListFriends] = useState([])
    const [walletAvatar, setWalletAvatar] = useState('')
    const [owner, setOwner] = useState()
    const [addMember, setAddMember] = useState(false)
    const [enableToSave, setEnableToSave] = useState(false)
    const showErrorSnackbar = useErrorSnackbar()

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    const handleSavingChange = () => {
        if (add) {
            const walletForCreation = {
                name: walletName,
                initBalance: initBalance,
                avatar: walletAvatar
            }
            walletService.createNewWallet(auth.userId, walletForCreation, auth.accessToken)
                .then(() => {
                    reloadWallets()
                })
                .catch(e => showErrorSnackbar(e.message))
        }
        else {
            const walletForUpdate = {
                name: walletName,
                avatar: walletAvatar
            }
            walletService.updateWallet(auth.userId, wallet.id, walletForUpdate, auth.accessToken)
                .then(() => {
                    reloadWallets()
                })
                .catch(e => showErrorSnackbar(e.message))
        }
    }

    useEffect(() => {
        if (open) {
            if (wallet) {
                setWalletName(wallet.name)
                setWalletAvatar(wallet.avatar)
                setInitBalance(wallet.initBalance)
                walletService.getAllWalletMembers(auth.userId, wallet.id, auth.accessToken)
                    .then(result => {
                        const owner = result.find(m => m.isOwner)
                        setOwner(owner)
                        setListMembers(result.filter(m => !m.isOwner))
                    })
                    .catch(e => showErrorSnackbar(e.message))
                setListFriends([])
            }
            else {
                setWalletName('')
                setWalletAvatar('/wallet1.png')
                setInitBalance(0)
                setListMembers([])
                setOwner(user)
                setListFriends([])
            }
        }
    }, [wallet, open])

    useEffect(() => {
        setEnableToSave(walletName)
    }, [walletName, open])

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
                        <Stack className={cx('avatar')} onClick={() =>
                            setOpenWalletAvatarSelectionDialog(true)}>
                            <Typography className={cx('select-title')}>
                                Avatar
                            </Typography>
                            <Stack direction='row' alignItems='center'>
                                <Avatar className={cx('owner-avatar')} sx={{ mr: '10px' }} src={walletAvatar}/>
                                <ArrowDropDownIcon />
                            </Stack>
                        </Stack>

                        <Stack className={cx('owner')}>
                            <Typography className={cx('select-title')}>
                                Owner
                            </Typography>
                            <Stack direction='row' alignItems='center'>
                                <Avatar className={cx('owner-avatar')} sx={{ mr: '10px' }} />
                                <Stack >
                                    {
                                        owner &&
                                        <Fragment>
                                            <Typography className={cx('owner-name')}>
                                                {owner.name}
                                            </Typography>
                                            <Typography className={cx('owner-email')}>
                                                {owner.email}
                                            </Typography>
                                        </Fragment>}
                                </Stack>
                            </Stack>
                        </Stack>

                        <Stack alignItems="flex-start" className={cx('select-friend')}>
                            <Typography className={cx('select-title')}>Members</Typography>
                            <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%' onClick={() => {
                                setAddMember(false)
                                setOpenMemberSelectionDialog(true)
                            }}>
                                <AvatarGroup max={10}>
                                    {
                                        listMembers.map((member, index) =>
                                            <Tooltip key={index} title={<h3>{member.name}</h3>} arrow>
                                                <Avatar className={cx('select-avatar')} />
                                            </Tooltip>)
                                    }
                                </AvatarGroup>

                                <Tooltip title={<h3>Add friend to wallet</h3>} arrow>
                                    <IconButton color="primary" aria-label="add" className={cx('add-friend-btn')} onClick={(e) => {
                                        // setAddMember(true)
                                        // setOpenMemberSelectionDialog(true)
                                        showErrorSnackbar('The feature is in development.')
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
                                thousandsGroupStyle="thousand" thousandSeparator="," suffix={` ${CURRENCY_UNIT}`} value={initBalance} onValueChange={(values, _) => setInitBalance(values.value)} disabled={!add} />
                        </Stack>
                    </Stack>

                    <MemberSelectionDialog
                        listMembers={listMembers}
                        listFriends={listFriends}
                        walletName={wallet ? wallet.name : null}
                        add={addMember}
                        open={openMemberSelectionDialog}
                        setOpen={setOpenMemberSelectionDialog} />

                    <WalletAvatarSelectionDialog
                        avatar={walletAvatar}
                        setAvatar={setWalletAvatar}
                        open={openWalletAvatarSelectionDialog}
                        setOpen={setOpenWalletAvatarSelectionDialog}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button className={cx('btn', 'cancel-btn')}
                    onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button className={cx('btn', enableToSave ? 'save-btn' : 'un-active-saving')} disabled={!enableToSave} onClick={() => {
                    setOpen(false)
                    handleSavingChange()
                }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default memo(EditWalletDialog);