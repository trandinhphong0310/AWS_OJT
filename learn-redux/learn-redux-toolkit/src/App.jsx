import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { useEffect } from 'react'
import { fetchAllUsers } from './redux/counter/CounterSlice'

function App() {
  const dispatch = useDispatch()
  const listUser = useSelector(state => state.user.listUsers)
  const isLoading = useSelector(state => state.user.isLoading)
  const isError = useSelector(state => state.user.isError)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  if (isError === true && isLoading === false) {
    return (
      <div>Something wrongs ...</div>
    )
  }

  if (isError === false && isLoading === true) {
    return (
      <div>Loading data ...</div>
    )
  }

  return (
    <>
      <h1>Hello Vite + React!</h1>
      <div className='form'>
        <table className='table-form'>
          <thead>
            <tr className='head'>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {listUser && listUser.length > 0 && listUser.map((user) => {
              return (
                <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
