import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App.js'
import './interceptors/axios.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <App />
)
