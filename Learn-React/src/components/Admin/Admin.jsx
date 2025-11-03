import { Outlet } from 'react-router-dom'
import SidebarTab from './SidebarTab'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export default function Admin() {
  return (
    <div className='flex'>
      <div>
        <SidebarTab />
      </div>
      <div>
        <Outlet />
      </div>
      
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
    </div>
  )
}
