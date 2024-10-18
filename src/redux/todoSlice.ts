import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { showNotification } from "./notificationSlice";

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
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
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

// Thunk functions
export const addTodoWithNotification =
  (text: string) => (dispatch: AppDispatch) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      isEditing: false,
    };

    dispatch(addTodo(newTodo));
    dispatch(
      showNotification({ message: "TODO added successfully!", type: "success" })
    );
  };

export const toggleCompleteWithNotification =
  (id: number, completed: boolean) => (dispatch: AppDispatch) => {
    dispatch(toggleComplete(id));
    const message = !completed
      ? "TODO marked as completed"
      : "TODO marked as incomplete";
    dispatch(showNotification({ message, type: "success" }));
  };

export const editTodoWithNotification =
  (id: number, newText: string) => (dispatch: AppDispatch) => {
    dispatch(editTodo({ id, newText }));
    dispatch(
      showNotification({
        message: "TODO updated successfully!",
        type: "success",
      })
    );
  };

export const deleteTodoWithNotification =
  (id: number) => (dispatch: AppDispatch) => {
    dispatch(deleteTodo(id));
    dispatch(
      showNotification({
        message: "TODO deleted successfully!",
        type: "success",
      })
    );
  };
