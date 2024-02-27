import classNames from "classnames/bind";
import { Card, Grid, Paper, Box, List, Stack, ListItem, ListItemButton, Typography, ButtonGroup, Button, Divider, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { CURRENCY_UNIT } from "../../utils/constants";
import { memo, useEffect, useState } from "react";


const transactions = [
    {
        type: 1,
        date: 28,
        month: "July 2023",
        amount: "+71,000",
        category: "Food",
        note: "bhx go go"
    },
    {
        type: 1,
        date: 28,
        month: "July 2023",
        amount: "+71,000",
        category: "Food",
        note: ""
    },
    {
        type: -1,
        date: 29,
        month: "July 2023",
        amount: "+71,000",
        category: "Drink",
        note: ""
    },
    {
        type: 1,
        date: 30,
        month: "July 2023",
        amount: "+71,000",
        category: "Drink",
        note: "abc abc abc"
    },
    {
        type: -1,
        date: 30,
        month: "July 2023",
        amount: "+71,000",
        category: "Food",
        note: ""
    },

]

function ListTransactions({ openCloseDetail }) {
    const [transactionsByDate, setTransactionsByDate] = useState([])

    useEffect(() => {
        const transByDate = []
        transactions.forEach(transaction => {
            const date = transaction.date;
            if (!transByDate[date]) {
                transByDate[date] = [];
            }
            transByDate[date].push(transaction);
        });
        setTransactionsByDate(transByDate)
    }, [])

    return (
        <List sx={{ m: 0, p: 0 }}> {
            transactionsByDate.map((transactionsInDay, index) =>
                <ListItem key={index} sx={{ m: 0, p: 0 }}>
                    <Stack sx={{ width: "100%" }} direction="column" >
                        <Stack>
                            <Box sx={{ height: "30px", background: "rgba(200,200,200,.4)" }}></Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row">
                                    <Typography sx={{ m: "8px 15px 8px 15px" }} variant="h2" component="div">{transactionsInDay[0].date}</Typography>
                                    <Stack sx={{ color: "rgb(154,154,154)" }} justifyContent="center">
                                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>Monday</Typography>
                                        <Typography sx={{ fontSize: "1.2rem" }}>{transactionsInDay[0].month}</Typography>
                                    </Stack>
                                </Stack>
                                <Typography sx={{ fontSize: "1.4rem", fontWeight: 600, m: "20px" }}>-73,000 <u>{CURRENCY_UNIT}</u></Typography>
                            </Stack>
                            <Divider />
                        </Stack>

                        <List sx={{ m: 0, p: 0 }}> {
                            transactionsInDay.map((transaction, index) =>
                                <ListItem key={index} onClick={() => openCloseDetail(true)}
                                    sx={{
                                        p: 0, m: 0, "&:hover": {
                                            background: "rgba(45, 184, 76, .1)",
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ m: "15px" }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>{transaction.category}</Typography>
                                        }
                                        secondary={
                                            <Typography sx={{ fontSize: "1.3rem", color: "rgb(154,154,154)" }}>{transaction.note}</Typography>
                                        }
                                    >
                                    </ListItemText>
                                    <Typography sx={{
                                        fontSize: "1.4rem", m: "20px",
                                        color: transaction.type === 1 ? "#039be5" : "#e51c23"
                                    }}>
                                        {transaction.amount} <u>{CURRENCY_UNIT}</u>
                                    </Typography>
                                </ListItem>
                            )
                        }
                        </List>
                    </Stack>
                </ListItem>
            )
        }
        </List>
    );
}

export default memo(ListTransactions);