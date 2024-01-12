import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupChatCount:0,
  chatCount:0,
  conversationCount:0,
  messageCount:0
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setGroupChatCount: (state, action) => {
      return {...state, groupChatCount: action.payload};
    },
    setChatCount: (state, action) => {
      return {...state, chatCount: action.payload};
    },
    
   
    
  },
});

export const { setGroupChatCount,setChatCount } = chatSlice.actions;

export default chatSlice.reducer;