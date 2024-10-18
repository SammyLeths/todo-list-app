import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string;
  type: "success" | "error" | "warning" | "";
  visible: boolean;
}

const initialState: NotificationState = {
  message: "",
  type: "",
  visible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "warning";
      }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },
    hideNotification: (state) => {
      state.visible = false;
      state.message = "";
      state.type = "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
