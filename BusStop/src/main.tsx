import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RefreshBtn from './ui/RefreshBtn.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <RefreshBtn/>
  </React.StrictMode>,
)
