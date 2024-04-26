import { configureStore } from "@reduxjs/toolkit";
import blockchainReducer from "./slices/blockchainSlice";
import userReducer from "./slices/userSlice";

/**
 * Configures and returns the Redux store.
 * This store is set up with slices for blockchain interactions and user-specific data.
 * The blockchain slice handles connections and transactions,
 * while the user slice manages user data and preferences.
 *
 * @returns {Store} - The configured Redux store.
 */
const setupStore = () => {
  try {
    // Configure the store with reducers from different slices
    const store = configureStore({
      reducer: {
        blockchain: blockchainReducer,
        user: userReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    return store;
  } catch (error) {
    console.error("Failed to configure Redux store:", error);
    // Optionally return a fallback or simplified store configuration if the primary setup fails
    return configureStore({
      reducer: {},
    });
  }
};

const store = setupStore();

export default store;
