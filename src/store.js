import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import modalReducer from "./slices/modalSlice";
import chatReducer from "./slices/chatSlice";
import setReducer from "./slices/setSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal:modalReducer,
    chat:chatReducer,
    set:setReducer,
  },
});

export default store;