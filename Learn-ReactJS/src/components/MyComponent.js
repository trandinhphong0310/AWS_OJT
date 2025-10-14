import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {

    state = {
        listUser: [
            {id: 1, name:"phong", age: 10},
            {id: 2, name:"tu", age: 20},
            {id: 3, name:"hung", age: 30},
        ]
    }

    handleAddNewUser = (userObj) => {
        this.setState({
            listUser: [
                userObj, ...this.state.listUser
            ]
        })
    }

    handleDeleteUser = (userId) => {
        let newListUser = this.state.listUser
        newListUser = newListUser.filter(item => item.id !== userId)
        this.setState({
            listUser: newListUser
        })
    }

    render() {
        return (
            <div>
                <AddUserInfo 
                    handleAddNewUser={this.handleAddNewUser}
                />
                <br></br>
                <DisplayInfo 
                    listUser={this.state.listUser}
                    handleDeleteUser={this.handleDeleteUser}
                />
            </div>
        )
    }
}

export default MyComponent
