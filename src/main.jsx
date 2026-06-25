import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InfoPage from './pages/InfoPage.jsx'
import { infoPages } from './content/infoPages.js'

const pageRoutes = {
  '/privacy-policy': 'privacy',
  '/terms-of-service': 'terms',
  '/refund-policy': 'refunds',
}

Object.entries(infoPages).forEach(([key, page]) => {
  pageRoutes[page.path] = key
})

const normalizedPath = window.location.pathname.replace(/\/$/, '') || '/'
const pageKey = pageRoutes[normalizedPath]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {pageKey ? <InfoPage pageKey={pageKey} /> : <App />}
  </StrictMode>,
)
