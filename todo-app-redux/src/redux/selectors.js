import { createSelector } from "@reduxjs/toolkit"

export const searchSelector = (state) => state.filters.search
export const filterStatusSelector = (state) => state.filters.status
export const priorityStatusSelector = (state) => state.filters.priority
export const todoListSelector = (state) => state.todoList

//reselect 
export const todoRemainingSelector = createSelector(
    todoListSelector,
    searchSelector,
    filterStatusSelector,
    priorityStatusSelector,
    (todoList, searchText, status, priority) => {
        return todoList.filter(todo => {
            if (status === 'All') {
                return (
                    priority.length
                        ? todo.name.includes(searchText) && priority.includes(todo.priority)
                        : todo.name.includes(searchText)
                )
            }

            return (
                todo.name.includes(searchText)
                && (status === 'Completed' ? todo.completed : !todo.completed)
                && (priority.length ? priority.includes(todo.priority) : true)
            )
        })
    }
)