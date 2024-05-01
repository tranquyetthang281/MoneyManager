
import classNames from "classnames/bind";
import styles from "./Account.module.scss"
import { Avatar, Stack, Typography, InputBase, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DatePickerDialog from "@/components/DatePickerDialog";
import { AuthContext } from "@/components/AuthProvider";
import { userService } from "@/apiServices";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";

const cx = classNames.bind(styles)

function Account() {
    const { auth, logOut } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState(dayjs());
    const [enableToSave, setEnableToSave] = useState(false)
    const [editing, setEditing] = useState(false)
    const [openDatePickerDialog, setOpenDatePickerDialog] = useState(false)
    const [openConfirmLogoutDialog, setOpenConfirmLogoutDialog] = useState(false)
    const navigate = useNavigate()
    const showErrorSnackbar = useErrorSnackbar()

    const closeConfirmLogoutDialog = () => setOpenConfirmLogoutDialog(false)

    useEffect(() => {
        userService.getUser(auth.userId, auth.accessToken)
            .then(result => {
                setEmail(result.email)
                setName(result.name)
                setDate(dayjs(result.birthDate))
            })
            .catch(e => showErrorSnackbar(e.message))
    }, [])

    useEffect(() => {
        setEnableToSave(name.length > 0)
    }, [name])

    const handleSavingChange = () => {
        const userForUpdate = {
            name: name,
            birthDate: date
        }
        userService.updateUser(auth.userId, userForUpdate, auth.accessToken)
    }

    return (
        <Stack className={cx('wrapper')} alignItems='center'>
            <Stack className={cx('container')} direction='row' justifyContent='center' alignItems='flex-start'>
                <Stack direction='column' alignItems='center' width='100%'>
                    <Stack direction='column' alignItems='center' width='100%'
                        sx={{ backgroundColor: 'rgba(45, 184, 76, .2)' }}>
                        <Button className={cx('logout-btn')} onClick={() => {
                            setOpenConfirmLogoutDialog(true)
                        }}>
                            Log Out
                        </Button>
                        <Avatar
                            sx={{
                                width: '150px',
                                height: '150px',
                                mt: '20px',
                                mb: '20px',
                                fontSize: '60px',
                                backgroundColor: 'rgb(45, 184, 76)'
                            }}
                        >
                            {name[0]}
                        </Avatar>
                        <Typography
                            sx={{
                                mb: '30px',
                                fontSize: '30px',
                            }}
                            variant='h5'
                        >
                            {email}
                        </Typography>
                    </Stack>
                    <Stack direction='row' sx={{ mt: '30px' }}>
                        <Stack alignItems="flex-start" className={cx(editing ? 'select' : 'un-active-select')}>
                            <Typography className={cx('select-title')}>Name</Typography>
                            <InputBase className={cx('input-note')} value={name}
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: '#000000',
                                    },

                                    '& ::placeholder': {
                                        color: 'red !important',
                                        opacity: '.8 !important'
                                    }
                                }}
                                onChange={e => {
                                    setName(e.target.value)
                                }} placeholder="*Name can not be empty" disabled={!editing}
                            />
                        </Stack>

                        <button className={cx(editing ? 'select' : 'un-active-select')} onClick={() => {
                            if (editing) {
                                setOpenDatePickerDialog(true)
                            }
                        }}>
                            <Stack alignItems="flex-start" sx={{ height: "100%" }}>
                                <Typography className={cx('select-title')}>Birth date</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                                    <Typography className={cx('date')}>{date.format('DD/MM/YYYY')}</Typography>
                                    <ArrowForwardIosIcon />
                                </Stack>
                            </Stack>
                        </button>
                    </Stack>

                    <Stack direction='row'
                        sx={{
                            alignSelf: 'flex-end',
                            margin: '30px 20px 0 0'
                        }}>
                        {
                            editing ?
                                <Fragment>
                                    <Button className={cx('btn', 'cancel-btn')} onClick={() => {
                                        setEditing(false)
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button className={cx('btn', enableToSave ? 'save-btn' : 'un-active-saving')} disabled={!enableToSave} onClick={() => {
                                        setEditing(false)
                                        handleSavingChange()
                                    }}>
                                        Save
                                    </Button>
                                </Fragment> :
                                <Button className={cx('btn', 'save-btn')} onClick={() => {
                                    setEditing(true)
                                }}>
                                    Edit
                                </Button>
                        }
                    </Stack>
                </Stack>
            </Stack>
            {
                openDatePickerDialog &&
                <DatePickerDialog
                    date={date}
                    setDate={setDate}
                    open={openDatePickerDialog}
                    setOpen={setOpenDatePickerDialog}
                    disableFuture
                />
            }

            <Dialog
                open={openConfirmLogoutDialog}
                onClose={closeConfirmLogoutDialog}
                PaperProps={{
                    sx: {
                        width: 600,
                    }
                }}>
                <DialogTitle>
                    {"Confirm log out"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Are you sure log out?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={cx('no-btn')} onClick={closeConfirmLogoutDialog} autoFocus>No</Button>
                    <Button className={cx('yes-btn')} onClick={() => {
                        closeConfirmLogoutDialog()
                        navigate('/login')
                        logOut()
                    }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </Stack>
    );
}

export default Account;