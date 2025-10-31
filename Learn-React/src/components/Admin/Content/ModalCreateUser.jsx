import { useState } from "react";

export default function ModalCreateUser() {
    const [addUserModal, setAddUserModal] = useState(false);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [role, setRole] = useState("User")
    const [previewImage, setPreviewImage] = useState("")

    const handleModal = () => {
        setAddUserModal(!addUserModal);
    };

    const handleUploadImage = (event) => {
        setPreviewImage(URL.createObjectURL(event.target.file[0]))
    }

    return (
        <div className="p-6">
            <button
                onClick={handleModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Add New User
            </button>

            {addUserModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-semibold mb-4">Add New User</h1>

                        <form className="space-y-3">
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
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
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
                                    value={image}
                                    onChange={(event) => handleUploadImage(event.target.value)}
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
                                        className="w-full h-full"
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
            )}
        </div>
    );
}
