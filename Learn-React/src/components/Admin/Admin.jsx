import { Outlet } from 'react-router-dom'
import SidebarTab from './SidebarTab'

export default function Admin() {
  return (
    <div className='flex'>
      <div>
        <SidebarTab />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
