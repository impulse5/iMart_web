import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './app/globals.css'
import { AuthenticationProvider } from './contexts/AuthenticationContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>,
)
