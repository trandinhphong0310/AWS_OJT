import { useState } from "react";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../Services/apiServices";

export default function ModalCreateUser(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("USER");
    const [previewImage, setPreviewImage] = useState("");

    const { show, onClose, setCurrentPage, fetchListUsersWithPaginate } = props;

    const handleModal = () => {
        onClose();
        setEmail("");
        setUsername("");
        setPassword("");
        setImage("");
        setRole("USER");
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitUser = async (event) => {
        event.preventDefault();

        const isValidate = validateEmail(email);
        if (!isValidate) {
            toast.error("Invalid email");
            return;
        }

        if (!password) {
            toast.error("Invalid password");
            return;
        }

        const data = await postCreateNewUser(email, password, username, role, image);

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            onClose();
        }

        if (data && data.EC === 0) {
            toast.success(data.EM);
            onClose();
            await fetchListUsersWithPaginate(1)
            setCurrentPage(1)
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 
                ${show ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            <div className="p-6">
                <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-semibold mb-4">Add New User</h1>

                    <form className="space-y-3" onSubmit={handleSubmitUser}>
                        <div>
                            <label
                                htmlFor="create-username"
                                className="block font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                id="create-username"
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="create-password"
                                className="block font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                id="create-password"
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="create-email"
                                className="block font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                id="create-email"
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="create-role"
                                className="block font-medium text-gray-700"
                            >
                                Role
                            </label>
                            <select
                                id="create-role"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="create-image"
                                className="block font-medium text-gray-700 cursor-pointer"
                            >
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                onChange={handleUploadImage}
                                id="create-image"
                                hidden
                            />
                        </div>

                        <div className="w-full h-[150px] border border-dashed flex justify-center items-center">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <label className="block font-medium text-gray-700 cursor-pointer">
                                    Preview Image
                                </label>
                            )}
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
