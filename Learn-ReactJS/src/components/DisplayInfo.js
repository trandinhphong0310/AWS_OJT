import React from "react";
import "./DisplayInfo.scss";

class DisplayInfo extends React.Component {
    state = {
        isShowList: true
    };

    handleHide = () => {
        this.setState({
            isShowList: !this.state.isShowList
        })
    }

    componentDidMount() {
        console.log("component mounted")
        setTimeout(() => {
            document.title = "Vibe Coding"
        }, 3000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.listUser !== prevProps.listUser) {
            if(this.props.listUser.length === 5) {
                alert("You got 5 users")
            }
        }
    }

    render() {  

        const { listUser, handleDeleteUser } = this.props;
        const { isShowList } = this.state;

        return (
            <div className="display-info-container">
                <div>
                    <span onClick={this.handleHide} className="hide">
                        {isShowList ? "Hide list users" : "Show list users"}
                    </span>
                </div>
                {isShowList && (
                    <div>
                        {listUser
                            .map((user, index) => {
                                return (
                                    <div key={index} className={user.age > 18 ? "green" : "red"}>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
                                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    </div>
                                )   
                            })}
                    </div>
                )}
            </div>
        )
    }
}

export default DisplayInfo