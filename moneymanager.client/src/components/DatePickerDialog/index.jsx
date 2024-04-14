import { Dialog, Stack, Button, Select } from "@mui/material";
import styles from "./DatePickerDialog.module.scss"
import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { redirect } from "react-router-dom";
import { StaticDatePicker } from "@mui/x-date-pickers";

const cx = classNames.bind(styles)

function DatePickerDialog({ open, openCloseDialog, date, selectDate }) {
    const handleClose = (_, reason) => {
        if (reason && reason === "backdropClick")
            return;
        openCloseDialog(false);
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
                    value={newDate}
                    onChange={(newDate) => {
                        setNewDate(newDate)
                    }}
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
                        openCloseDialog(false)
                        selectDate(newDate)
                    }}>
                        Ok
                    </Button>
                    <Button className={cx('btn', 'cancel-btn')}
                        onClick={() => openCloseDialog(false)}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}

export default memo(DatePickerDialog);