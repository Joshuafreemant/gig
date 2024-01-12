import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  allUsers:null,
  count:0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {...state, user: action.payload};
    },
    setAllUsers: (state, action) => {
        return {...state, allUsers: action.payload};
      },
      setCount: (state, action) => {
        return {...state, count: action.payload};
      }
    
  },
});

export const { setUser,setAllUsers,setCount } = userSlice.actions;

export default userSlice.reducer;