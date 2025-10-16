import { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

const MyComponent = () => {
    const [listUser, setListUser] = useState([
        { id: 1, name: "phong", age: 10 },
        { id: 2, name: "tu", age: 20 },
        { id: 3, name: "hung", age: 30 },
    ])

    const handleAddNewUser = (userObj) => {
        setListUser([userObj, ...listUser])
    }

    const handleDeleteUser = (userId) => {
        let newListUser = listUser
        newListUser = newListUser.filter(item => item.id !== userId)
        setListUser(newListUser)
    }

    return (
        <div>
            <AddUserInfo
                handleAddNewUser={handleAddNewUser}
            />
            <br></br>
            <DisplayInfo
                listUser={listUser}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    )
}

export default MyComponent
