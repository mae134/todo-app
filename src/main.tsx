import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // 開発用に２回レンダリングするためにStrictModeでAppをラップする
  <StrictMode>
    <App />
  </StrictMode>,
)
