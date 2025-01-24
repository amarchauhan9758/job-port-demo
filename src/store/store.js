import { configureStore, combineReducers } from "@reduxjs/toolkit";
import jobsReducer from "./slice/jobSlice";
import userDetails from "./slice/userDetails";

import applicationHistoryReducer from "./slice/appHistorySlice";

const rootReducer = combineReducers({
  jobs: jobsReducer, // Assign `jobsReducer` to the `jobs` key
  userDetails: userDetails, // Assign `userDetails` reducer to `userDetails` key
  applicationHistory: applicationHistoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
