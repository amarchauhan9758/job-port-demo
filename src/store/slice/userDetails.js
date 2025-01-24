import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userDetails = createSlice({
  name: "user",
  initialState,
  reducers: {
    authentication: (state, action) => {
      state.user = action.payload; // Save jobs to Redux state
    },
    logout: (state) => {
      state.user = {}; // Clear user data on logout
    },
  },
});

export const { authentication, logout } = userDetails.actions;
export default userDetails.reducer;
