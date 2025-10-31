import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/User/User.jsx'
import Admin from './components/Admin/Admin.jsx'
import Home from './components/Home/Home.jsx'
import ManageUser from './components/Admin/Content/ManageUser.jsx'
import DashBoard from './components/Admin/Content/DashBoard.jsx'

const root = document.getElementById('root');
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/users' element={<User />} />
        </Route>
        <Route path='/admins' element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path='manage-users' element={<ManageUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
