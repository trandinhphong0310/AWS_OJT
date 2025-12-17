import axios from "axios";
import {
    FETCH_USERS_ERROR, FETCH_USERS_SUCCESS, FETCH_USERS_REQUEST,
    CREATE_USERS_REQUEST, CREATE_USERS_SUCCESS, CREATE_USERS_ERROR,
    DELETE_USERS_SUCCESS
} from "./types";

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUsersRequest())
        try {
            const res = await axios.get('http://localhost:8080/users/all')
            const data = res && res.data ? res.data : []
            dispatch(fetchUsersSuccess(data))
        } catch (err) {
            console.log(err)
            dispatch(fetchUsersError())
        }
    }
}

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess = (payload) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: payload
    }
}

const fetchUsersError = () => {
    return {
        type: FETCH_USERS_ERROR,
    }
}

const createUsersRequest = () => {
    return {
        type: CREATE_USERS_REQUEST,
    }
}

const createUsersSuccess = () => {
    return {
        type: CREATE_USERS_SUCCESS
    }
}

const createUsersError = () => {
    return {
        type: CREATE_USERS_ERROR,
    }
}

export const createNewUsers = (email, password, username) => {
    return async (dispatch, getState) => {
        dispatch(createUsersRequest())
        try {
            const res = await axios.post('http://localhost:8080/users/create', { email, password, username })
            if (res && res.data.errCode === 0) {
                dispatch(createUsersSuccess())
                dispatch(fetchAllUsers())
            }
        } catch (err) {
            dispatch(createUsersError())
        }
    }
}

const deleteUsersSuccess = () => {
    return {
        type: DELETE_USERS_SUCCESS
    }
}

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post(`http://localhost:8080/users/delete/${id}`)
            if(res && res.data.errCode === 0) {
                dispatch(deleteUsersSuccess())
                dispatch(fetchAllUsers())
            }
        } catch (err) {
            console.log(err)
        }
    }
}