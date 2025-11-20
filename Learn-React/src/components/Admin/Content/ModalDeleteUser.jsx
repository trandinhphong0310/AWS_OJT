import { toast } from 'react-toastify'
import { deleteUser } from '../../Services/apiServices'

export default function ModalDeleteUser(props) {

    const { show, setShow, dataDelete, 
        fetchListUsersWithPaginate, setCurrentPage } = props

    const handleClose = () => {
        setShow(false)
    }

    const handleConfirm = async () => {
        const data = await deleteUser(dataDelete.id);

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUsersWithPaginate(1)
            setCurrentPage(1)
        }
    }

    if (!show) return null

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
                <h2 className="text-xl font-semibold mb-3">Delete User</h2>
                <p className="text-gray-600 mb-5">
                    Are you sure you want to delete
                    <b> {dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
                    ? This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => { handleConfirm() }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
