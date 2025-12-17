import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { userSelector } from '../redux/selector'

export default function Header() {

    const listUser = useSelector(userSelector)

    console.log(listUser)

    return (
        <>
            <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="h-8 w-auto" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href='/dashboard' aria-current="page" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">Dashboard</a>
                                    <Menu as="div" className="relative inline-block text-left">
                                        <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 cursor-pointer hover:bg-white/5 hover:text-white">
                                            {`(${listUser.length}) Users`}
                                        </MenuButton>

                                        <MenuItems className="absolute left-0 mt-2 w-40 origin-top-left rounded-md bg-gray-800 py-1 shadow-lg focus:outline-none z-10">
                                            {listUser && listUser.length > 0 && listUser.map(user => {
                                                return (
                                                    <MenuItem key={user.id}>
                                                        {({ focus }) => (
                                                            <a
                                                                href="/"
                                                                className={`block px-4 py-2 text-sm text-gray-300 ${focus ? 'bg-white/5' : ''}`}
                                                            >
                                                                {user.username}
                                                            </a>
                                                        )}
                                                    </MenuItem>
                                                )
                                            })}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
