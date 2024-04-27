import { Dialog, Stack, Button } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { memo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DatePickerDialog.module.scss"

const cx = classNames.bind(styles)

function DatePickerDialog({ date, setDate, disableFuture, onlyMonth, open, setOpen }) {
    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setOpen(false);
    }

    const [newDate, setNewDate] = useState(date)

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 320,
                    height: "auto",
                    fontSize: "20px"
                }
            }}>

            <Stack>
                <DateCalendar
                    disableFuture={disableFuture}
                    value={newDate}
                    onChange={(newDate) => {
                        setNewDate(newDate)
                    }}
                    views={onlyMonth ? ['month', 'year'] : ['year', 'month', 'day']}
                    sx={{
                        '.MuiPickersCalendarHeader-labelContainer': {
                            fontSize: "16px"
                        },
                        '.MuiSvgIcon-root': {
                            fontSize: "20px"
                        },
                        '.MuiPickersYear-yearButton': {
                            fontSize: "14px",
                        },
                        '.MuiDayCalendar-weekDayLabel': {
                            fontSize: "14px"
                        },
                        '.MuiPickersDay-root': {
                            fontSize: "14px"
                        },
                        '.MuiPickersCalendarHeader-root': {
                            backgroundColor: "rgb(45, 184, 76)",
                            m: 0,
                            p: "24px 12px 24px 24px"
                        }
                    }} />

                <Stack direction="row-reverse">
                    <Button className={cx('btn', 'save-btn')} onClick={() => {
                        setOpen(false)
                        setDate(newDate)
                    }}>
                        Ok
                    </Button>
                    <Button className={cx('btn', 'cancel-btn')}
                        onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}

export default memo(DatePickerDialog);