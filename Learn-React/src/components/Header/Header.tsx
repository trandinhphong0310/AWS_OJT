import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    const [showMenu, setShowMenu] = useState<boolean>(false)

    return (
        <header className="bg-black text-white shadow-md text-[16px]">
            <div className='max-w-6xl mx-auto flex justify-between items-center px-6 py-4'>
                <div className='flex gap-5'>
                    <span className='hover:text-gray-500 cursor-pointer'>Tran Dinh Phong</span>
                    <ul className='flex gap-4 ml-8'>
                        <li className='hover:text-gray-500 cursor-pointer'>
                            <Link to="/">Home</Link>

                        </li>
                        <li className='hover:text-gray-500 cursor-pointer'>
                            <Link to="/users">User</Link>

                        </li>
                        <li className='hover:text-gray-500 cursor-pointer'>
                            <Link to="/admins">Admin</Link>

                        </li>
                    </ul>
                </div>
                <div
                    className='relative'
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}>
                    <button className='hover:text-gray-300 transition cursor-pointer'>Settings</button>
                    {showMenu && (
                        <ul className='absolute right-0 w-32 bg-gray-800 rounded-lg shadow-lg overflow-hidden text-sm'>
                            <li className='px-4 py-2 hover:bg-gray-700 cursor-pointer'>Login</li>
                            <li className='px-4 py-2 hover:bg-gray-700 cursor-pointer'>Logout</li>
                            <li className='px-4 py-2 hover:bg-gray-700 cursor-pointer'>Profile</li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    )
}
