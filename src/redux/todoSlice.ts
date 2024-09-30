import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        isEditing: false,
      };
      state.todos.unshift(newTodo);
      saveToLocalStorage(state.todos);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state.todos);
      }
    },
    setEditing: (
      state,
      action: PayloadAction<{ id: number; isEditing: boolean }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.isEditing = action.payload.isEditing;
        saveToLocalStorage(state.todos);
      }
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: number; newText: string }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.newText;
        saveToLocalStorage(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state.todos);
    },
  },
});

export const { addTodo, toggleComplete, setEditing, editTodo, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
