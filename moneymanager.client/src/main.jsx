import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './components/GlobalStyles'
import { StyledEngineProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </StyledEngineProvider>
  </React.StrictMode>
)
