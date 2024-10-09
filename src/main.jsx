import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import App from './App.jsx'
import './index.css'
import { DarkModeProvider } from './components/utils/DarkModeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <DarkModeProvider>
    <HashRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </HashRouter>
    </DarkModeProvider>

)
