import React from "react";

class AddUserInfo extends React.Component {
    state = {
        name: "phong",
        age: 20,
        address: "hcm",
    }

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1),
            name: this.state.name,
            age: this.state.age
        })
    }

    render() {
        return (
            <div>
                <div>
                    I'm {this.state.name} from {this.state.address} age {this.state.age}
                </div>
                <br></br>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>Input name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(event) => { this.handleChangeName(event) }}
                    />
                    <label>Input age</label>
                    <input
                        type="text"
                        value={this.state.age}
                        onChange={(event) => { this.handleChangeAge(event) }}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddUserInfo