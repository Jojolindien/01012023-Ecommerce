import { createSlice } from "@reduxjs/toolkit";

// const userState = {email : '', token:''};

const userSlice = createSlice({
  name: "user",
  initialState: { email: "", token: "" },
  reducers: {
    loggedIn(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.email = '';
      state.token = '';
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
