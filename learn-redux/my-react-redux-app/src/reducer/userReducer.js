import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR } from "../action/types";

const initState = {
    listUser: []
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
            }
        case FETCH_USERS_SUCCESS:
            console.log(action)
            return {
                ...state,
                listUser: action.payload
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                
            }
        default:
            return state
    }
}

export default userReducer;