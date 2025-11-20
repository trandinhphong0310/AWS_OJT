import ModalCreateUser from "./ModalCreateUser";
// import TableUser from "./TableUser";
import { useEffect, useState } from 'react'
import { getAllUsers, getUserWithPaginate } from '../../Services/apiServices'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

export default function ManageUser() {
  const LIMIT_USER = 6
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [listUser, setListUser] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataView, setDataView] = useState({})
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataDelete, setDataDelete] = useState({})

  useEffect(() => {
    fetchListUsersWithPaginate(1)
  }, [])

  const fetchListUsers = async () => {
    const res = await getAllUsers()
    if (res.EC === 0) {
      const sorted = [...res.DT].sort((a, b) => a.id - b.id)
      setListUser(sorted)
    }
  }

  const fetchListUsersWithPaginate = async (page) => {
    const res = await getUserWithPaginate(page, LIMIT_USER)
    console.log(res.DT)
    if (res.EC === 0) {
      const sorted = [...res.DT.users].sort((a, b) => a.id - b.id)
      setListUser(sorted)
      setPageCount(res.DT.totalPages)
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

  const handleOpenViewModal = (user) => {
    setShowViewModal(true)
    setDataView(user)
  }

  const handleCloseViewModal = () => {
    setShowViewModal(false)
    setDataView(null)
  }

  const handleDeleteUser = (user) => {
    setDataDelete(user)
    setShowDeleteModal(true)
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
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        onClose={handleOpenCloseCreateModal}
        show={showCreateModal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ModalUpdateUser
        dataUpdate={dataUpdate}
        onClose={handleCloseUpdateModal}
        show={showUpdateModal}
        fetchListUsers={fetchListUsers}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ModalViewUser
        onClose={handleCloseViewModal}
        show={showViewModal}
        dataView={dataView}
      />

      <ModalDeleteUser
        setShow={setShowDeleteModal}
        show={showDeleteModal}
        dataDelete={dataDelete}
        fetchListUsers={fetchListUsers}
        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div>
        <TableUserPaginate 
          listUser={listUser}
          onUpdate={handleOpenUpdateModal}
          onView={handleOpenViewModal}
          onDelete={handleDeleteUser}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
