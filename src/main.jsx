import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import NavBar from './components/navbar.jsx'
import CreateReview from './pages/CreateReview.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar/>
      <CreateReview/>
    </BrowserRouter>
  </StrictMode>,
)
