import { Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import App from './App.jsx'
import User from './components/User/User.jsx'
import Admin from './components/Admin/Admin.jsx'
import Home from './components/Home/Home.jsx'
import ManageUser from './components/Admin/Content/ManageUser.jsx'
import DashBoard from './components/Admin/Content/DashBoard.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'

export default function Layout() {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='/users' element={<User />} />
                </Route>

                <Route path='/admins' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    )
}
