import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import { ToastProvider } from './components/Toast/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastProvider defaultPosition="top-right" defaultDuration={3000}>
                <App />
            </ToastProvider>
        </BrowserRouter>
    </Provider>,
)
