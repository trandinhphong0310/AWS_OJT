import axios from "axios";
import { INCREMENT, DECREMENT, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS, FETCH_USERS_REQUEST } from "./types";

export const increaseCounter = () => {
    return {
        type: INCREMENT
    }
}

export const decreaseCounter = () => {
    return {
        type: DECREMENT
    }
}

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