import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllUsers } from '../action/actions'
import { useSelector } from 'react-redux'
import { deleteUser } from '../action/actions'
import { userSelector, isLoadingSelector, isErrorSelector } from '../redux/selector'

export default function TableUser() {
  const listUser = useSelector(userSelector)
  const isLoading = useSelector(isLoadingSelector)
  const isError = useSelector(isErrorSelector)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
    dispatch(fetchAllUsers())
  }

  if (isError === true && isLoading === false) {
    return (
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4 w-fit mx-auto ">
        <table className="text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                No
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Username
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <span>Something wrongs, please try again...</span>
          </tbody>
        </table>
      </div>
    )
  }

  if (isError === false && isLoading === true) {
    return (
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4 w-fit mx-auto ">
        <table className="text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                No
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Username
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <span>Loading data...</span>
          </tbody>
        </table>
      </div>
    )
  }

  if (isError === false && isLoading === false) {
    return (
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4 w-fit mx-auto ">
        <table className="text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                No
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Username
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listUser && listUser.length > 0 && listUser.map(user => {
              return (
                <tr key={user.id} className="bg-neutral-primary border-b border-default">
                  <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    {user.id}
                  </th>
                  <td className="px-6 py-4">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className='bg-red-600 px-3 py-2 rounded-xl text-white cursor-pointer hover:bg-red-500 transition-all duration-300ms ease-in-out'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
