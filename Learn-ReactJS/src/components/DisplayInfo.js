import React from "react";
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
    return (
        <div className="display-info-container">
            {true && (
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

export default DisplayInfo