import React, { useState } from "react";
import "./DisplayInfo.scss";

// class DisplayInfo extends React.Component {
//     render() {  
//         const { listUser, handleDeleteUser } = this.props;
//         return (
//             <div className="display-info-container">
//                 {true && (
//                     <div>
//                         {listUser
//                             .map((user, index) => {
//                                 return (
//                                     <div key={index} className={user.age > 18 ? "green" : "red"}>
//                                         <div>My name is {user.name}</div>
//                                         <div>My age is {user.age}</div>
//                                         <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                 )   
//                             })}
//                     </div>
//                 )}
//             </div>
//         )
//     }
// }

const DisplayInfo = (props) => {
    const { listUser, handleDeleteUser } = props;
    const [isShowListUser, setShowListUser] = useState(true)

    const handleShowHide = () => {
        if (isShowListUser === true)
            setShowListUser(false)
        else
            setShowListUser(true)
    }

    return (
        <div className="display-info-container">
            <div>
                <span onClick={() => handleShowHide()}>
                    {isShowListUser === true ? "Hide list user" : "Show list user"}
                </span>
            </div>
            {isShowListUser && (
                <div>
                    {listUser.map(user => (
                        <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                            <div>My name is {user.name}</div>
                            <div>My age is {user.age}</div>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DisplayInfo