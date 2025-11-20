import { useEffect, useState } from "react";
import _ from 'lodash'

export default function ModalViewUser(props) {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    const { onClose, dataView, show } = props

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email)
            setUsername(dataView.username)
            setRole(dataView.role)
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }
        }
    }, [dataView])

    const handleModal = () => {
        onClose()
    };


    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 
                ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <div className="p-6">
                <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-semibold mb-4">Detail User</h1>
                    <form className="space-y-3">
                        <div>
                            <label
                                className="block font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                disabled
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                className="block font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                className="block font-medium text-gray-700"
                            >
                                Role
                                <input
                                    type="text"
                                    value={role}
                                    disabled
                                    className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                                />
                            </label>
                        </div>

                        <div>
                            <label
                                className="block font-medium text-gray-700 cursor-pointer"
                            >
                                Image
                            </label>
                        </div>

                        <div
                            className="w-full h-[150px] border border-dashed flex justify-center items-center"
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            ) : <label
                                className="block font-medium text-gray-700 cursor-pointer"
                            >
                                Preview Image
                            </label>
                            }
                        </div>

                        <div className="flex justify-end space-x-3 mt-5">
                            <button
                                type="button"
                                onClick={handleModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
