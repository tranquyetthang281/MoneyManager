import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

function CustomItemTooltipContent({ itemData, series }) {
    const data = series.data[itemData.dataIndex]

    return (
        <Fragment>
            {
                data &&
                <Stack sx={{
                    position: 'absolute',
                    padding: '8px 20px 8px 20px',
                    left: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.12)',

                }} direction='row' alignItems='center'
                >
                    <Box sx={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: data.color,
                        borderRadius: '50%'
                    }} />
                    <Avatar sx={{
                        margin: '0 10px 0 20px',
                        width: '30px',
                        height: '30px',
                    }} src={data.avatar} />
                    <Typography sx={{
                        fontSize: '16px',
                        color: 'rgba(0,0,0,0.6)',
                        marginRight: '20px'
                    }} noWrap>
                        {data.label}
                    </Typography>
                    <Typography sx={{
                        fontSize: '16px',
                        color: data.formattedValue.includes('+') ? "#039be5" : "#e51c23"
                    }} noWrap>
                        {data.formattedValue}
                    </Typography>

                    <Typography sx={{
                        marginLeft: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'rgba(0,0,0,0.8)',
                    }} noWrap>
                        {`(${(data.percent * 100).toFixed(2)}%)`}
                    </Typography>
                </Stack>
            }
        </Fragment>
    );
}

export default CustomItemTooltipContent;