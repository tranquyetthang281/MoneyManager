import { Avatar, Dialog, DialogContent, DialogTitle, IconButton, Stack, ListItemIcon, List, ListItem, ListItemAvatar, Divider, ListItemText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Fragment, memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CategorySelectionDialog.module.scss";

const cx = classNames.bind(styles)

function CategorySelectionDialog({ selectedCategory, categories, setSelectedCategory, open, setOpen }) {

    const [inflowCategories, setInflowCategories] = useState([])
    const [outflowCategories, setOutflowCategories] = useState([])
    const [selectingOut, setSelectingOut] = useState(true)

    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    useEffect(() => {
        if (categories) {
            const inflowList = []
            const outflowList = []
            Object.entries(categories).forEach(([_, c]) => {
                if (c.type > 0) {
                    inflowList.push(c)
                } else {
                    outflowList.push(c)
                }
            })
            setInflowCategories(inflowList)
            setOutflowCategories(outflowList)
        }
    }, [categories])

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
                onClick={() => setOpen(false)}
                sx={{ position: 'absolute', right: 12, top: 12, }}>
                <CloseIcon sx={{ width: 24, height: 24, color: "black" }} />
            </IconButton>

            <DialogTitle sx={{ fontSize: "20px", fontWeight: 600 }}>
                Select Category
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Stack sx={{ width: '100%' }}>
                    <Stack className={cx('select')} direction="row">
                        <button className={cx('select-btn', selectingOut ? 'selected-btn' : null)}
                            onClick={() => setSelectingOut(true)}>Outflow</button>
                        <button className={cx('select-btn', selectingOut ? null : 'selected-btn')}
                            onClick={() => setSelectingOut(false)}>Inflow</button>
                    </Stack>

                    <Stack>
                        <List sx={{ width: '100%', p: 0, overflowY: "auto" }}>
                            {
                                (selectingOut ? outflowCategories : inflowCategories).map((category, index) => {
                                    const isSelected = selectedCategory && category.id === selectedCategory.id

                                    return <Fragment key={index}>
                                        <ListItem
                                            className={cx('category-item')}
                                            onClick={() => {
                                                setOpen(false)
                                                setSelectedCategory(category)
                                            }}>
                                            <ListItemAvatar>
                                                <Avatar src={category.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <span className={cx('name-item', isSelected ? 'primary-text' : null)}>
                                                        {category.name}
                                                    </span>
                                                }
                                            />

                                            {
                                                isSelected &&
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