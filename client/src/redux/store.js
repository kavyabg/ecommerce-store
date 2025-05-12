import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // use sessionStorage
import { combineReducers } from 'redux';

// Persist config only for auth slice
const persistConfig = {
  key: 'auth',
  storage: storageSession,
  whitelist: ['user', 'isAuthenticated'], // only persist these
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);
