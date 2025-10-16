import { useState } from "react";

const AddUserInfo = (props) => {
    const [addUser, setAddUser] = useState({
        name: "phong",
        age: 20,
        address: "hcm",
    })

    const { handleAddNewUser } = props

    const handleChangeName = (event) => {
        setAddUser({
            ...addUser,
            name: event.target.value
        })
    }

    const handleChangeAge = (event) => {
        setAddUser({
            ...addUser,
            age: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: addUser.name,
            age: addUser.age
        })
    }

    return (
        <div>
            <div>
                I'm {addUser.name} from {addUser.address} age {addUser.age}
            </div>
            <br></br>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Input name</label>
                <input
                    type="text"
                    value={addUser.name}
                    onChange={handleChangeName}
                />
                <label>Input age</label>
                <input
                    type="text"
                    value={addUser.age}
                    onChange={handleChangeAge}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfo