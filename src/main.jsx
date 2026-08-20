import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles/index.css'

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
document.body.classList.toggle('theme-dark', prefersDark)
document.documentElement.style.colorScheme = prefersDark ? 'dark' : 'light'
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', prefersDark ? '#0f1220' : '#f8f7ff')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
