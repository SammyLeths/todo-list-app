import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "./todoSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
