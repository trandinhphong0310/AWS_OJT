import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../Services/apiServices";
import _ from "lodash";

export default function ModalUpdateUser(props) {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("USER")
    const [previewImage, setPreviewImage] = useState("")

    const { onClose, dataUpdate, show, currentPage,
        fetchListUsersWithPaginate } = props

    useEffect(() => {
        if(!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole("USER")
            setImage("")
            if(dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleModal = () => {
        onClose()
        setEmail("");
        setUsername("");
        setPassword("");
        setImage("");
        setRole("USER");
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }

    const handleSubmitUser = async (event) => {
        event.preventDefault()

        const data = await putUpdateUser(dataUpdate.id, username, role, image)

        if (data && data.EC !== 0) {
            toast.error(data.EM)
            onClose()
        }

        if (data && data.EC === 0) {
            toast.success(data.EM)
            onClose()
            await fetchListUsersWithPaginate(currentPage)
        }
    }
    
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 
                ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <div className="p-6">
                <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-semibold mb-4">Update User</h1>
                    <form className="space-y-3" onSubmit={handleSubmitUser}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                id="username"
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                                id="password"
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                                id="email"
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="role"
                                className="block font-medium text-gray-700"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                onChange={(event) => setRole(event.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            >
                                <option value="User">USER</option>
                                <option value="Admin">ADMIN</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="image"
                                className="block font-medium text-gray-700 cursor-pointer"
                            >
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                onChange={handleUploadImage}
                                id="image"
                                hidden
                            />
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
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
