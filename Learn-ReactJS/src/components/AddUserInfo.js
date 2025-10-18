import { useState } from "react";

const AddUserInfo = (props) => {
    const [name, setName] = useState('phong');
    const [address, setAddress] = useState('hcm');
    const [age, setAge] = useState('20');

    const { handleAddNewUser } = props

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeAge = (event) => {
        setAge(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: name,
            age: age
        })
    }

    return (
        <div>
            <div>
                I'm {name} from {address} age {age}
            </div>
            <br></br>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Input name</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                />
                <label>Input age</label>
                <input
                    type="text"
                    value={age}
                    onChange={handleChangeAge}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfo