import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MatcherProvider } from './contexts/matcher/provider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MatcherProvider>
      <App />
    </MatcherProvider>
  </StrictMode>
)
