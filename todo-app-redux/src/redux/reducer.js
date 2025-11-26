import { combineReducers } from "redux"

import filtersReducer from "../components/Filters/FiltersSlice"
import TodoListReducer from "../components/TodoList/TodosSlice"

const rootReducer = combineReducers({
    filters: filtersReducer,
    todoList: TodoListReducer,
})

export default rootReducer