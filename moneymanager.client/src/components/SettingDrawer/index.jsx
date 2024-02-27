import classNames from "classnames/bind";
import styles from "./SettingDrawer.module.scss";
import { Drawer, Stack, List, ListItem, ListItemText, ListItemIcon, ListItemButton, Divider, Avatar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WalletIcon from '@mui/icons-material/Wallet';
import PeopleIcon from '@mui/icons-material/People';
import { memo } from "react";

const cx = classNames.bind(styles)

const user = {
    name: "Tran Thang",
    email: "tranquyetthang@gmail.com",
    avatar: ""
}

function SettingDrawer({ isShowing, toggleDrawer }) {

    return (
        <Drawer anchor="left"
            open={isShowing}
            onClose={toggleDrawer(false)}>

            <Stack sx={{ width: 364 }}
                direction="column">

                <Stack direction="column"
                    sx={{ height: "200px", width: "100%" }}
                    justifyContent="center"
                    alignItems="center">
                    <Avatar sx={{ height: '70px', width: '70px' }} />
                    <span className={cx("name-text")}>{user.name}</span>
                    <span className={cx("email-text")}>{user.email}</span>
                </Stack>

                <List
                    sx={{ width: "100%" }}
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>

                    <Divider component="li" />

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
                </List>
            </Stack>
        </Drawer>
    );
}

export default memo(SettingDrawer);