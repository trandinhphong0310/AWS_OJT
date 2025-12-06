import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewUsers } from "../action/actions"
import { isCreatingSelector } from "../redux/selector"

export default function FormAddNew() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const isCreating = useSelector(isCreatingSelector);

  const handleCreateNewUser = () => {
    dispatch(createNewUsers(email, password, username));
    setEmail("");
    setPassword("");
    setUsername("");
  }

  return (
    <div>
      <form className="w-full max-w-sm mx-auto mt-10">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-email"
              type="email"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              value={username}
              onChange={event => setUsername(event.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              onClick={() => handleCreateNewUser()}
              disabled={isCreating}
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
