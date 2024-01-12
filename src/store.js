import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal:modalReducer,
    chat:chatReducer,
  },
});

export default store;