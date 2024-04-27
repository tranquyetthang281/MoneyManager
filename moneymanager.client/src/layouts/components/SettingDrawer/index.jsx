import classNames from "classnames/bind";
import { Drawer, Stack, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Divider, Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WalletIcon from '@mui/icons-material/Wallet';
import PeopleIcon from '@mui/icons-material/People';
import { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/components/AuthProvider";
import { userService } from "@/apiServices";
import styles from "./SettingDrawer.module.scss";
import useErrorSnackbar from "@/hooks/useErrorSnackbar";

const cx = classNames.bind(styles)

function SettingDrawer({ isShowing, toggleDrawer }) {

    const { auth } = useContext(AuthContext)
    const [user, setUser] = useState()
    const showErrorSnackbar = useErrorSnackbar()

    useEffect(() => {
        userService.getUser(auth.userId, auth.accessToken)
            .then(result => setUser(result))
            .catch(e => showErrorSnackbar(e.message))
    }, [])

    return (
        <Drawer anchor="left"
            open={isShowing}
            onClose={toggleDrawer(false)}>

            <Stack sx={{ width: 364 }}
                direction="column">

                {
                    user &&
                    <Stack direction="column"
                        sx={{ height: "200px", width: "100%" }}
                        justifyContent="center"
                        alignItems="center">
                        <Avatar
                            sx={{
                                height: '70px',
                                width: '70px',
                                background: 'rgb(45, 184, 76)',
                                fontSize:'30px'
                            }}>
                            {user.name[0]}
                        </Avatar>
                        <span className={cx("name-text")}>{user.name}</span>
                        <span className={cx("email-text")}>{user.email}</span>
                    </Stack>
                }

                <List
                    sx={{ width: "100%" }}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>

                    <Divider component="li" />

                    <Link to='/account'>
                        <ListItem className={cx('item')} disablePadding divider
                            secondaryAction={
                                <ArrowForwardIosIcon sx={{ mr: "20px", color: "rgba(0,0,0,.5)" }} />
                            }>
                            <ListItemButton sx={{ p: 2 }}>
                                <ListItemIcon>
                                    <PersonIcon sx={{ fontSize: 30 }} />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <span className={cx("item-text")}>Account</span>
                                } />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to='/my-wallets'>
                        <ListItem className={cx('item')} disablePadding divider
                            secondaryAction={
                                <ArrowForwardIosIcon sx={{ mr: "20px", color: "rgba(0,0,0,.5)" }} />
                            }>
                            <ListItemButton sx={{ p: 2 }}>
                                <ListItemIcon>
                                    <WalletIcon sx={{ fontSize: 30 }} />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <span className={cx("item-text")}>My Wallets</span>
                                } />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    {/* <Link to='friends'>
                        <ListItem className={cx('item')} disablePadding divider
                            secondaryAction={
                                <ArrowForwardIosIcon sx={{ mr: "20px", color: "rgba(0,0,0,.5)" }} />
                            }>
                            <ListItemButton sx={{ p: 2 }}>
                                <ListItemIcon>
                                    <PeopleIcon sx={{ fontSize: 30 }} />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <span className={cx("item-text")}>Friends</span>
                                } />
                            </ListItemButton>
                        </ListItem>
                    </Link> */}
                </List>
            </Stack>
        </Drawer>
    );
}

export default memo(SettingDrawer);