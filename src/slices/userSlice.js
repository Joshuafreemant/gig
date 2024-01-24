import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  allUsers:null,
  adminUsers:null,
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
      setAdminUsers: (state, action) => {
        return {...state, adminUsers: action.payload};
      },
      setCount: (state, action) => {
        return {...state, count: action.payload};
      }
    
  },
});

export const { setUser,setAllUsers,setCount,setAdminUsers } = userSlice.actions;

export default userSlice.reducer;