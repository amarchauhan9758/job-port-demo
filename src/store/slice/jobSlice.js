import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = sessionStorage.getItem("jobsState");
      return serializedState ? JSON.parse(serializedState) : { jobs: [] };
    } catch (e) {
      console.error("Could not load state", e);
      return { jobs: [] };
    }
  }

  // Fallback for server-side rendering
  return { jobs: [] };
};

const saveState = (state) => {
  try {
    const serializedState = sessionStorage.setItem(
      "jobsState",
      JSON.stringify(state)
    );
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
