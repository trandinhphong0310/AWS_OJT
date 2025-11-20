import { Outlet } from 'react-router-dom'
import SidebarTab from './SidebarTab'

export default function Admin() {
  return (
    <div className='flex'>
      <div>
        <SidebarTab />
      </div>
      <div className='mx-auto container'>
        <Outlet />
      </div>


    </div>
  )
}
