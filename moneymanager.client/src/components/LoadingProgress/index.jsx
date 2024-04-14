import { CircularProgress, Stack } from "@mui/material";

function LoadingProgress() {
    return (
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ height: '100%', width: '100%' }}>
            <CircularProgress size={80} sx={{ color: 'rgb(45, 184, 76)' }} />
        </Stack>
    );
}

export default LoadingProgress;