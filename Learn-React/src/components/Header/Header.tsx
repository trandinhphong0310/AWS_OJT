import { Link } from 'react-router-dom'

export default function Header() {

    return (
        <header className="text-[#2a222b] text-[16px] font-medium">
            <div className='max-w-6xl mx-auto flex justify-between items-center px-6 py-4'>
                <div className='flex gap-5'>
                    <span className='hover:text-gray-500 cursor-pointer'>
                        <Link to="/">Tran Dinh Phong</Link>
                    </span>
                    <ul className='flex gap-4 ml-8'>
                        <li className='active:text-gray-500 cursor-pointer'>
                            <Link to="/">Home</Link>

                        </li>
                        <li className='active:text-gray-500 cursor-pointer'>
                            <Link to="/users">User</Link>

                        </li>
                        <li className='active:text-gray-500 cursor-pointer'>
                            <Link to="/admins">Admin</Link>

                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='flex'>
                        <li className='px-4 py-2 hover:text-purple-300 cursor-pointer'>Log in</li>
                        <li className='px-4 py-2 bg-[#2a222b] rounded-2xl text-white hover:text-gray-400  hover:scale-90 ease-in-out transition cursor-pointer'>Sign up</li>
                        <li className='px-4 py-2 hover:text-purple-300 cursor-pointer'>Profile</li>
                    </ul>
                </div>
            </div>
        </header >
    )
}
