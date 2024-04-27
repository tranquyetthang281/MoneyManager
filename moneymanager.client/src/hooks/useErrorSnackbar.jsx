import { useSnackbar } from 'notistack';

function useErrorSnackbar() {
    const { enqueueSnackbar } = useSnackbar();
    const showErrorSnackbar = (message) => enqueueSnackbar('Error: ' + message, { variant: 'error' })
    return showErrorSnackbar
}

export default useErrorSnackbar;