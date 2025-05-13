import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./baseApi/baseApi";
import storage from "redux-persist/lib/storage"; // Use localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
// import { dashBoardSliceReducer } from "./features/dashboard/dashboardSlice";

// Step 1: Configure persist for `auth` slice
const authPersistConfig = {
  key: "auth",
  storage, // Default uses localStorage
  whitelist: ["token", "user"], // Only persist specific parts of the state if necessary
};

// Step 2: Wrap the reducers with `persistReducer`
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Auth slice with persistence
  [baseApi.reducerPath]: baseApi.reducer, // baseApi reducer for API requests
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this check for redux-persist compatibility
    }).concat(baseApi.middleware), // Add baseApi middleware
});

export const persistor = persistStore(store);

// Step 3: Call this in your main app component to integrate redux-persist
setupListeners(store.dispatch);
