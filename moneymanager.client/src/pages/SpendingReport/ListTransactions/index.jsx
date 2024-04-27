import { Box, List, Stack, ListItem, Typography, Divider, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { memo, useEffect, useState } from "react";
import dateFormat from "dateformat";
import currencyFormatter from "@/utils/currencyFormatter";

function ListTransactions({ dicCategories, listTrans }) {

    const [transactionsByDate, setTransactionsByDate] = useState([])

    const sumOfTransactions = (transactions) =>
        transactions.reduce((n, { amount }) => n + amount, 0)

    useEffect(() => {
        if (listTrans.length > 0) {
            const transByDate = []
            listTrans.forEach(transaction => {
                const date = dateFormat(transaction.date, 'd');
                if (!transByDate[date]) {
                    transByDate[date] = [];
                }
                transByDate[date].push(transaction);
            });
            setTransactionsByDate(transByDate)
        }
    }, [listTrans])

    return (
        <List sx={{ m: 0, p: 0 }}> {
            transactionsByDate.map((transactionsInDay, index) =>
                <ListItem key={index} sx={{ m: 0, p: 0 }}>
                    <Stack sx={{ width: "100%" }} direction="column" >
                        <Stack>
                            <Box sx={{ height: "30px", background: "rgba(200,200,200,.4)" }}></Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Stack direction="row">
                                    <Typography sx={{ fontSize: "48px", m: "8px 15px 8px 15px" }} variant="h2" component="div">{dateFormat(transactionsInDay[0].date, 'dd')}</Typography>
                                    <Stack sx={{ color: "rgb(154,154,154)" }} justifyContent="center">
                                        <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{dateFormat(transactionsInDay[0].date, 'dddd')}</Typography>
                                        <Typography sx={{ fontSize: "12px" }}>{dateFormat(transactionsInDay[0].date, 'mmmm yyyy')}</Typography>
                                    </Stack>
                                </Stack>
                                <Typography sx={{ fontSize: "14px", fontWeight: 600, m: "20px" }}>{currencyFormatter(sumOfTransactions(transactionsInDay))}</Typography>
                            </Stack>
                            <Divider />
                        </Stack>

                        <List sx={{ m: 0, p: 0 }}> {
                            transactionsInDay.map((transaction, index) =>
                                dicCategories[transaction.categoryId] &&
                                <ListItem key={index}
                                    sx={{
                                        p: 0, m: 0, "&:hover": {
                                            background: "rgba(45, 184, 76, .1)",
                                        }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ m: "15px", width: "48px", height: "48px" }} src={dicCategories[transaction.categoryId].avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                                                {dicCategories[transaction.categoryId].name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography sx={{ fontSize: "14px", color: "rgb(154,154,154)" }}>{transaction.note}</Typography>
                                        }
                                    >
                                    </ListItemText>
                                    <Typography sx={{
                                        fontSize: "14px", m: "20px",
                                        color: dicCategories[transaction.categoryId].type > 0 ? "#039be5" : "#e51c23"
                                    }}>
                                        {currencyFormatter(transaction.amount)}
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