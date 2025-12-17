import {
    FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR,
    CREATE_USERS_REQUEST, CREATE_USERS_ERROR, CREATE_USERS_SUCCESS,
    DELETE_USERS_SUCCESS
} from "../action/types";

const initState = {
    listUser: [],
    isLoading: false,
    isError: false,
    isCreating: false,
    isDelete: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case FETCH_USERS_SUCCESS:
            console.log(action)
            return {
                ...state,
                listUser: action.payload,
                isLoading: false,
                isError: false,
            }
        case FETCH_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case CREATE_USERS_REQUEST:
            return {
                ...state,
                isCreating: true
            }
        case CREATE_USERS_SUCCESS:
            return {
                ...state,
                isCreating: false
            }
        case CREATE_USERS_ERROR:
            return {
                ...state,
                isCreating: false
            }
        case DELETE_USERS_SUCCESS:
            return {
                ...state,
                isDelete: true
            }
        default:
            return state
    }
}

export default userReducer;