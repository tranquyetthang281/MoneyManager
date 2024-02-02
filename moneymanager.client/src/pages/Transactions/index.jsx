import classNames from "classnames/bind";
import styles from "./Transactions.module.scss"
import { Card, Grid, Paper, Box, List, Stack, ListItem, ListItemButton, Typography, ButtonGroup, Button, Divider } from "@mui/material";
import { CURRENCY_UNIT } from "../../utils/constants";

const cx = classNames.bind(styles)

function Transactions() {
    return (
        <Grid className={cx('wrapper')} container>
            <Grid item md={6}>
                <Stack className={cx('transactions-list')}>
                    <Stack>
                        <Stack className={cx('time-select')} direction="row">
                            <button className={cx('time-select-btn')}>01/07/2024-01/07/2024</button>
                            <button className={cx('time-select-btn', 'time-select-btn-center')}>01/07/2024-01/07/2024</button>
                            <button className={cx('time-select-btn')}>01/07/2024-01/07/2024</button>
                        </Stack>

                        <Stack sx={{ height: 100, p: "20px", fontSize: "1.4rem" }}>
                            <Stack justifyContent="space-between" direction="row">
                                <span>Inflow</span>
                                <span className={cx('money-in')}>+6,800,000 <u>{CURRENCY_UNIT}</u></span>
                            </Stack>
                            <Stack justifyContent="space-between" direction="row" sx={{ mt: "10px" }}>
                                <span>Outflow</span>
                                <span className={cx('money-out')}>-6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                            </Stack>

                            <Divider primary="Inset below" sx={{ width: 120, alignSelf: "end", height: 10, borderBottomWidth: 2 }} />

                            <span style={{ alignSelf: "end", marginTop: 10 }}>-6,800,000,000 <u>{CURRENCY_UNIT}</u></span>
                        </Stack>
                    </Stack>

                    <List sx={{ overflowY: "scroll", height: "100%" }}>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                10-20
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Stack>
            </Grid>

            <Grid item md={6}>
                <Stack className={cx('edit-form')}>
                    <Typography>haha</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Transactions;