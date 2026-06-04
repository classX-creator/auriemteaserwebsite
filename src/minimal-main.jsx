import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './minimal.css';
import MinimalPage from './MinimalPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MinimalPage />
  </StrictMode>,
);
