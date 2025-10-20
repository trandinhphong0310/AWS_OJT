import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/User/User.tsx'
import Admin from './components/Admin/Admin.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/users' element={<User />} />
          <Route path='/admins' element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
