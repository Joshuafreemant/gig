import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sets: [],
};

const setSlice = createSlice({
  name: "set",
  initialState,
  reducers: {
    setSets: (state, action) => {
      return { ...state, sets: action.payload };
    },
  },
});

export const { setSets } =
  setSlice.actions;

export default setSlice.reducer;
