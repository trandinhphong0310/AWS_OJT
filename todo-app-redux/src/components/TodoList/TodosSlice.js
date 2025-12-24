// const initState = [
//   { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//   { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//   { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },
// ];

// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'todoList/addTodo':
//       return [...state, action.payload];

//     case 'todoList/toggleTodoStatus':
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

// export default todoListReducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todoList',
  initialState: {state: 'idle', todos: []},
  reducers: { // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find(todo => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.state = 'idle';
    })
    // builder.addCase(fetchTodos.rejected, (state, action) => {
    //   state.status =
    // })
  }
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('/api/todos');
  return res.todos;
});

/*
  => todos/fetchTodos/pending
  => todos/fetchTodos/fulfilled
  => todos/fetchTodos/rejected
*/

export default todosSlice;

// export function addTodos(todos) {
//   return function addTodosThunk(dispatch, getState) {
//     console.log('[addTodosThunk]', getState())
//     console.log({todos})

//     todos.name = "phong tran"
//     dispatch(todosSlice.actions.addTodo(todos));

//     console.log('[addTodosThunk after]', getState())
//   }
// }