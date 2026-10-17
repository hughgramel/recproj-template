import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecordingErrorBoundary } from './components/RecordingErrorBoundary'

// In development/recording mode, prevent unhandled runtime errors from popping up browser overlays
if (import.meta.env.DEV) {
  window.addEventListener('error', (e) => {
    e.preventDefault();
  });
  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecordingErrorBoundary>
      <App />
    </RecordingErrorBoundary>
  </StrictMode>,
)
