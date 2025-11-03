import { useEffect, useState } from 'react'
import { getAllUsers } from '../../Services/apiServices'

export default function TableUser() {

    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchListUsers()
    }, [])

    const fetchListUsers = async () => {
        const res = await getAllUsers()
        if(res.EC === 0) {
            setListUser(res.DT)
        }
    }

    return (
        <div>
            <div className="relative overflow-x-auto border border-gray-50 rounded-2xl shadow-xl">
                <table className="w-full text-sm text-left bg-white">
                    <thead className="text-xs uppercase border-b bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 && listUser.map((item, index) => {
                            return (
                                <tr key={index} className='border-t hover:bg-gray-200 transition-all duration-75 ease-in-out cursor-pointer'>
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.role}
                                    </td>
                                </tr>
                            )
                        })}
                        {listUser && listUser.length === 0 &&
                            <tr>
                                <td colSpan={'4'} className="px-6 py-4 text-center size-[18px]">Not found data</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
