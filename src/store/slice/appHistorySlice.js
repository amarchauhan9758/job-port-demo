import { createSlice } from "@reduxjs/toolkit";

// Load state from sessionStorage
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("appHistory");
    return serializedState ? JSON.parse(serializedState) : { applications: [] };
  } catch (e) {
    console.error("Could not load state", e);
    return { applications: [] }; // Correct fallback state
  }
};

// Save state to sessionStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("appHistory", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Load initial state
const initialState = loadState();

// Create slice
const applicationHistorySlice = createSlice({
  name: "applicationHistory",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      const newState = {
        ...state,
        applications: [...state.applications, action.payload], // Avoid direct mutation
      };
      saveState(newState); // Persist new state
      return newState; // Return the updated state
    },
    setApplications: (state, action) => {
      const newState = {
        ...state,
        applications: action.payload, // Replace entire applications array
      };
      saveState(newState); // Persist new state
      return newState; // Return the updated state
    },
  },
});

// Export actions and reducer
export const { addApplication, setApplications } =
  applicationHistorySlice.actions;

export default applicationHistorySlice.reducer;
