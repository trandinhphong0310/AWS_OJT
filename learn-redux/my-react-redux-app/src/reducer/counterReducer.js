import { DECREMENT, INCREMENT } from "../action/types";

const initState = {
    count: 0
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}

export default reducer;