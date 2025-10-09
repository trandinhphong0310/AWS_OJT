import React from "react";

class UserInfo extends React.Component {
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
    }

    render() {
        return (
            <div>
                I'm {this.state.name} from {this.state.address} age {this.state.age}
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

export default UserInfo