import ReactPaginate from "react-paginate"

export default function TableUserPaginate(props) {

    const { listUser, onUpdate, onView,
        onDelete, fetchListUsersWithPaginate,
        pageCount, setCurrentPage, currentPage } = props

    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };

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
                                            onClick={() => onView(item)}
                                            className="ml-2 px-2 py-1 rounded-lg bg-gray-200 hover:cursor-pointer transition-all ease-in-out duration-75 hover:opacity-75">
                                            View
                                        </button>
                                        <button
                                            onClick={() => onUpdate(item)}
                                            className="ml-2 px-2 py-1 rounded-lg bg-blue-400 hover:cursor-pointer transition-all ease-in-out duration-75 hover:opacity-75">
                                            Update
                                        </button>
                                        <button
                                            onClick={() => onDelete(item)}
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
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="cursor-pointer px-3 py-1 border border-gray-300"
                    pageLinkClassName="page-link"
                    previousClassName="px-3 py-1 cursor-pointer border border-gray-300"
                    previousLinkClassName="page-link"
                    nextClassName="px-3 py-1 cursor-pointer border border-gray-300"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="px-3 py-1 cursor-pointer border border-gray-300"
                    breakLinkClassName="page-link"
                    containerClassName="flex justify-center mt-4 mb-4"
                    activeClassName="text-white bg-blue-500 transition-all duration-300 ease-in-out"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </div>
    )
}
