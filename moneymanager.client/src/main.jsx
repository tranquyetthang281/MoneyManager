import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles'
import { StyledEngineProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AuthProvider from './components/AuthProvider';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <GlobalStyles>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider maxSnack={5}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </GlobalStyles>
    </StyledEngineProvider>
  </React.StrictMode>
)
