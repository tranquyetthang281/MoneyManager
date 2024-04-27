import { Stack, Box, Link, Checkbox, FormControlLabel, Avatar, Button, TextField, Typography, Container, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss'
import { DatePicker } from '@mui/x-date-pickers';
import { authService } from '@/apiServices';
import useErrorSnackbar from '@/hooks/useErrorSnackbar';
import LoadingProgress from '@/components/LoadingProgress';

const cx = classNames.bind(styles)

const defaultTheme = createTheme();

export default function Register() {

    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')
    const [birthDate, setBirthDate] = useState()
    const [birthDateError, setBirthDateError] = useState(false)
    const [birthDateErrorMessage, setBirthDateErrorMessage] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const showErrorSnackbar = useErrorSnackbar()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name')
        const email = data.get('email')
        const password = data.get('password')
        const confirmPassword = data.get('confirm-password')
        if (name && birthDate && email && password && confirmPassword) {
            if (!emailError && !passwordError && !confirmPasswordError && !birthDateError) {
                setLoading(true)
                const userInfo = {
                    email: email,
                    password: password,
                    name: name,
                    birthDate: new Date(birthDate),
                    avatar: ''
                }
                authService.register(userInfo)
                    .then(() => {
                        setLoading(false)
                        setOpenDialog(true)
                    })
                    .catch(e => {
                        if (e.response.data.DuplicateEmail) {
                            showErrorSnackbar("Email has been used")
                        } else {
                            showErrorSnackbar(e.message)
                        }
                    })
            }
        }
        else {
            if (!name) {
                setNameError(true)
            }
            if (!birthDate) {
                setBirthDateError(true)
                setBirthDateErrorMessage('Birth date is required')
            }
            if (!password) {
                setPasswordError(true)
                setPasswordErrorMessage('Password is required')
            }
            if (!confirmPassword) {
                setConfirmPasswordError(true)
                setConfirmPasswordErrorMessage('Confirm Password is required')
            }
            if (!email) {
                setEmailError(true)
                setEmailErrorMessage('Email is required')
            }
        }

    };

    const handleEmailChange = e => {
        const validEmailPattern = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!e.target.value) {
            setEmailError(true)
            setEmailErrorMessage('Email is required')
        }
        else if (!e.target.value.match(validEmailPattern)) {
            setEmailError(true)
            setEmailErrorMessage('Invalid email address')
        } else {
            setEmailError(false)
        }
    };

    const handlePasswordChange = e => {
        if (!e.target || e.target.value.length < 8) {
            setPasswordError(true)
            setPasswordErrorMessage('Password requires a minimum length of 8 characters')
        }
        else if (e.target.value.search(/[a-zA-Z]/) == -1
            || e.target.value.search(/\d/) == -1) {
            setPasswordError(true)
            setPasswordErrorMessage('Password must contain both letters and numbers')
        }
        else {
            setPasswordError(false)
            setPassword(e.target.value)
        }
    };

    const handleNameChange = e => {
        if (!e.target.validity.valid) {
            setNameError(true)
        }
        else {
            setNameError(false)
        }
    };

    const handleConfirmPasswordChange = e => {
        if (!e.target.value) {
            setConfirmPasswordError(true)
            setConfirmPasswordErrorMessage('Confirm Password is required')
        }
        else if (e.target.value !== password) {
            setConfirmPasswordError(true)
            setConfirmPasswordErrorMessage('Confirm password does not match')
        }
        else {
            setConfirmPasswordError(false)
        }
    };

    const handleBirthDateChange = date => {
        if (!date.isValid() || date.isAfter()) {
            setBirthDateError(true)
            setBirthDateErrorMessage('Invalid birth date')
        }
        else {
            setBirthDateError(false)
        }
        setBirthDate(date)
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Stack sx={{ width: '100%', height: '100vh', maxHeight: '100vh', background: '#fff' }}>
                {
                    loading &&
                    <Box className={cx('loading')}>
                        <LoadingProgress />
                    </Box>
                }
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, width: '64px', height: '64px' }} variant="square" src='wallet.png'>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Money Manager
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        autoFocus
                                        error={nameError}
                                        onChange={handleNameChange}
                                        helperText={nameError ? "Name is required" : ""}
                                    />
                                </Grid>
                                <Grid item xs={20}>
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        autoComplete="bday"
                                        disableFuture
                                        id="birth-date"
                                        name="birth-date"
                                        format="DD/MM/YYYY"
                                        views={['year', 'month', 'day']}
                                        label='Birth date*'
                                        onChange={handleBirthDateChange}
                                        slotProps={{
                                            textField: {
                                                error: birthDateError,
                                                helperText: birthDateError ? birthDateErrorMessage : "",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={emailError}
                                        onChange={handleEmailChange}
                                        helperText={emailError ? emailErrorMessage : ""}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        error={passwordError}
                                        onChange={handlePasswordChange}
                                        helperText={passwordError ? passwordErrorMessage : ""}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm-password"
                                        error={confirmPasswordError}
                                        onChange={handleConfirmPasswordChange}
                                        helperText={confirmPasswordError ? confirmPasswordErrorMessage : ""}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className={cx('register-btn')}
                            >
                                Register
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="login" variant="body2">
                                        Already have an account? Log in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Dialog
                    open={openDialog}
                    disableEscapeKeyDown
                >
                    <DialogTitle>
                        Register successfully
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please check your email inbox to confirm your registered email address. Once confirmed, proceed to the Log In page.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link href="/login">
                            <Button className={cx('login-btn')}>
                                Log In
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </Stack>
        </ThemeProvider>
    );
}