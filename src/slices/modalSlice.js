import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewFilteredResult:false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setViewFilteredResult: (state, action) => {
      return {...state, viewFilteredResult: action.payload};
    },
   
    
  },
});

export const { setViewFilteredResult } = modalSlice.actions;

export default modalSlice.reducer;