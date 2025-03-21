import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("jobsState");
    return serializedState ? JSON.parse(serializedState) : { jobs: [] };
  } catch (e) {
    console.error("Could not load state", e);
    return { jobs: [] };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("jobsState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const initialState = loadState();
// const initialState = [];

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload; // Save jobs to Redux state
      saveState(state);
    },
  },
});

export const { setJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
