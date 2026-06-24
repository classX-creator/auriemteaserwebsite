import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InfoPage from './pages/InfoPage.jsx'

const pageRoutes = {
  '/product': 'product',
  '/pricing': 'pricing',
  '/privacy': 'privacy',
  '/privacy-policy': 'privacy',
  '/terms': 'terms',
  '/terms-of-service': 'terms',
  '/refunds': 'refunds',
  '/refund-policy': 'refunds',
  '/contact': 'contact',
}

const normalizedPath = window.location.pathname.replace(/\/$/, '') || '/'
const pageKey = pageRoutes[normalizedPath]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {pageKey ? <InfoPage pageKey={pageKey} /> : <App />}
  </StrictMode>,
)
