import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './Doctor/Webrtc/SocketProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
    <SocketProvider>
    <App />
    </SocketProvider>
   
  </React.StrictMode>,
)
