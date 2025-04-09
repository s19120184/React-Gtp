import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactGtp from './ReactGtp'

//hoal

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <ReactGtp/>
  </StrictMode>,
)
