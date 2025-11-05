import ModalCreateUser from "./ModalCreateUser";
import TableUser from "./TableUser";
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../Services/apiServices'
import ModalUpdateUser from "./ModalUpdateUser";

export default function ManageUser() {
  const [listUser, setListUser] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})

  useEffect(() => {
    fetchListUsers()
  }, [])

  const fetchListUsers = async () => {
    const res = await getAllUsers()
    if (res.EC === 0) {
      const sorted = [...res.DT].sort((a, b) => a.id - b.id)
      setListUser(sorted)
    }
  }

  const handleOpenUpdateModal = (user) => {
    setShowUpdateModal(true)
    setDataUpdate(user)
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false)
    setDataUpdate(null)
  }

  const handleOpenCloseCreateModal = () => {
    setShowCreateModal(!showCreateModal)
  }

  return (
    <>
      <button
        onClick={handleOpenCloseCreateModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition my-4"
      >
        Add New User
      </button>

      <ModalCreateUser
        fetchListUsers={fetchListUsers}
        onClose={handleOpenCloseCreateModal}
        show={showCreateModal}
      />

      <ModalUpdateUser
        dataUpdate={dataUpdate}
        onClose={handleCloseUpdateModal}
        show={showUpdateModal}
      />

      <div>
        <TableUser listUser={listUser} onUpdate={handleOpenUpdateModal} />
      </div>
    </>
  );
}
