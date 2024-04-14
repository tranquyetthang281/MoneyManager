
import { Stack, Box, Link, Checkbox, FormControlLabel, Avatar, Button, TextField, Typography, Container, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './LogIn.module.scss';
import { authService } from '@/apiServices';
import { AuthContext } from '@/components/AuthProvider';

const cx = classNames.bind(styles)

const defaultTheme = createTheme({
    typography: {
        fontSize: 25.6,
    }
})

export default function LogIn() {
    const { setAuth } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userInfo = {
            email: data.get('email'),
            password: data.get('password')
        }
        console.log(userInfo);
        authService.logIn(userInfo)
            .then(result => {
                const auth = {
                    userId: result.userId,
                    accessToken: result.token
                }
                setAuth(auth)
                authService.saveAuth(auth)
            })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Stack sx={{ width: '100%', height: '100vh', background: '#fff' }}>
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
                            Sign in
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
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                className={cx('sign-in-btn')}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Stack>
        </ThemeProvider>
    );
}