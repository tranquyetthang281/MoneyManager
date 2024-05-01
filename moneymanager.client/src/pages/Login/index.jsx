
import { Stack, Box, Link, Checkbox, FormControlLabel, Avatar, Button, TextField, Typography, Container, Grid, Fab } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LogIn.module.scss';
import { authService } from '@/apiServices';
import { AuthContext } from '@/components/AuthProvider';
import useErrorSnackbar from '@/hooks/useErrorSnackbar';
import LoadingProgress from '@/components/LoadingProgress';

const cx = classNames.bind(styles)

const defaultTheme = createTheme()

function Signature(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Created by tranquyetthang281@gmail.com'}
        </Typography>
    );
}

export default function LogIn() {
    const { setAuth } = useContext(AuthContext)
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const showErrorSnackbar = useErrorSnackbar()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')

        if (email && password) {
            if (!emailError) {
                setLoading(true)
                const userInfo = {
                    email: email,
                    password: password
                }
                authService.logIn(userInfo)
                    .then(result => {
                        const auth = {
                            userId: result.userId,
                            accessToken: result.token
                        }
                        setAuth(auth)
                        navigate('/')
                        setLoading(false)
                    })
                    .catch((e) => {
                        if (e.response.status === 500) {
                            showErrorSnackbar(e.message)
                        } else {
                            showErrorSnackbar(e.response.data.Message)
                        }
                        setLoading(false)
                    })
            }
        }
        else {
            if (!email) {
                setEmailError(true)
                setEmailErrorMessage('Email is required')
            }
            if (!password) {
                setPasswordError(true)
                setPasswordErrorMessage('Password is required')
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
        else {
            setPasswordError(false)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Stack sx={{ width: '100%', height: '100vh', background: '#fff' }}>
                {
                    loading &&
                    <Box className={cx('loading')}>
                        <LoadingProgress />
                    </Box>
                }
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                error={emailError}
                                onChange={handleEmailChange}
                                helperText={emailError ? emailErrorMessage : ""}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                onChange={handlePasswordChange}
                                helperText={passwordError ? passwordErrorMessage : ""}
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className={cx('sign-in-btn')}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Signature sx={{ mt: 8, mb: 4 }} />
                </Container>
            </Stack>
        </ThemeProvider>
    );
}