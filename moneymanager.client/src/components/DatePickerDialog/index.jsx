import { Dialog, Stack, Button } from "@mui/material";
import styles from "./DatePickerDialog.module.scss"
import classNames from "classnames/bind";
import { memo, useState } from "react";
import dayjs from "dayjs";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { redirect } from "react-router-dom";
import { StaticDatePicker } from "@mui/x-date-pickers";

const cx = classNames.bind(styles)

function DatePickerDialog({ open, openCloseDialog, date, setDate }) {

    return (
        <Dialog open={open} onClose={() => openCloseDialog(false)} maxWidth="lg"
            PaperProps={{
                sx: {
                    width: 320,
                    height: "auto",
                    fontSize: "20px"
                }
            }}>

            <Stack>
                <DateCalendar value={date}
                    onChange={(newDate) => {
                        setDate(newDate)
                    }}
                    sx={{
                        '.MuiPickersCalendarHeader-labelContainer': {
                            fontSize: "1.6rem"
                        },
                        '.MuiSvgIcon-root': {
                            fontSize: "2.0rem"
                        },
                        '.MuiPickersYear-yearButton': {
                            fontSize: "1.4rem",
                        },
                        '.MuiDayCalendar-weekDayLabel': {
                            fontSize: "1.4rem"
                        },
                        '.MuiPickersDay-root': {
                            fontSize: "1.4rem"
                        },
                        '.MuiPickersCalendarHeader-root': {
                            backgroundColor: "rgb(45, 184, 76)",
                            m: 0,
                            p: "24px 12px 24px 24px"
                        }
                    }} />

                <Stack direction="row-reverse">
                    <Button className={cx('btn', 'save-btn')}>
                        Ok
                    </Button>
                    <Button className={cx('btn', 'cancel-btn')}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}

export default memo(DatePickerDialog);