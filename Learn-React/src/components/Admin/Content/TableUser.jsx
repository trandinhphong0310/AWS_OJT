export default function TableUser(props) {

    const { listUser, onUpdate } = props

    return (
        <div>
            <div className="relative overflow-x-auto border border-gray-50 rounded-2xl shadow-xl">
                <table className="w-full text-sm text-left bg-white">
                    <thead className="text-xs uppercase border-b bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
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
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 && listUser.map((item) => {
                            return (
                                <tr key={item.id} className='border-t cursor-pointer'>
                                    <td className="px-6 py-4">
                                        {item.id}
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
                                    <td className="">
                                        <button
                                            className="ml-2 px-2 py-1 rounded-lg bg-gray-200 hover:cursor-pointer transition-all ease-in-out duration-75 hover:opacity-75">
                                            View
                                        </button>
                                        <button
                                            onClick={() => onUpdate(item)}
                                            className="ml-2 px-2 py-1 rounded-lg bg-blue-400 hover:cursor-pointer transition-all ease-in-out duration-75 hover:opacity-75">
                                            Update
                                        </button>
                                        <button
                                            className="ml-2 px-2 py-1 rounded-lg bg-red-400 hover:cursor-pointer transition-all ease-in-out duration-75 hover:opacity-75">
                                            Delete
                                        </button>
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
