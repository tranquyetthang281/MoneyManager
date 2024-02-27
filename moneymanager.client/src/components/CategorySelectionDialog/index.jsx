import classNames from "classnames/bind";
import styles from "./CategorySelectionDialog.module.scss"
import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, Grid, TextField, InputBase, Button, ListItemIcon, List, ListItem, ListItemAvatar, Divider, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';


import { Fragment, memo, useState } from "react";

const cx = classNames.bind(styles)

const listCategories = [
    {
        id: 1,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 2,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 3,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 4,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 5,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 6,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 7,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 8,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 9,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 10,
        name: "this is category name",
        icon: "total.png",
    },
    {
        id: 11,
        name: "this is category name",
        icon: "total.png",
    },
]

function CategorySelectionDialog({ open, openCloseDialog }) {
    const [currentCategory, setCurrentCategory] = useState(null)

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseDialog(false);
    }

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

            <DialogTitle sx={{ fontSize: "2.0rem", fontWeight: 600 }}>
                Select Category
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Stack sx={{ width: '100%' }}>
                    <Stack className={cx('select')} direction="row">
                        <button className={cx('select-btn')}>Outflow</button>
                        <button className={cx('select-btn', 'selected-btn')}>Inflow</button>
                    </Stack>

                    <Stack>
                        <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                            {
                                listCategories.map((category, index) => {
                                    const isCurrent = currentCategory && category.id === currentCategory.id

                                    return <Fragment key={index}>
                                        <ListItem
                                            className={cx('category-item')}
                                            onClick={() => {
                                                openCloseDialog(false)
                                                setCurrentCategory(category)
                                            }}>
                                            <ListItemAvatar>
                                                <Avatar src={category.icon} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <span className={cx('name-item', isCurrent ? 'primary-text' : null)}>
                                                        {category.name}
                                                    </span>
                                                }
                                            />

                                            {
                                                isCurrent &&
                                                <ListItemIcon>
                                                    <DoneIcon color="success" sx={{ fontSize: 25 }} />
                                                </ListItemIcon>
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

        </Dialog>
    );
}

export default memo(CategorySelectionDialog);