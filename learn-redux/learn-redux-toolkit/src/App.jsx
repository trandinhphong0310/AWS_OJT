import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react'
import { fetchAllUsers } from './redux/counter/CounterSlice'

function App() {
  const dispatch = useDispatch()
  const listUser = useSelector(state => state.user.value)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <>
      <h1>Hello Vite + React!</h1>
      <div className='form'>
        <table className='table-form'>
          <thead>
            <tr className='head'>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr className='body'>
              {listUser && listUser.length > 0 && listUser.map((user) => {
                return (
                  <div>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </div>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
