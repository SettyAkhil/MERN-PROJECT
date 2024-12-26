import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Import reducers
import recentActivityReducer from './recent'; // Recent activity reducer
import { AuthReducer } from './AuthSlice'; // Authentication reducer

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth', 'recentActivity'], // Specify reducers to persist
};

// Combine all reducers
const rootReducer = combineReducers({
  Auth: AuthReducer, // Authentication state
  recentActivity: recentActivityReducer, // Recent activity state
});

// Apply persistReducer to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'], // Optional: Ignore non-serializable paths
      },
    }),
});

// Configure persistor for persistence
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };
