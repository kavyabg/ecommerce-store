import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // changed to use localStorage
import { combineReducers } from 'redux';

// Persist config only for auth slice
const persistConfig = {
  key: 'auth',
  storage: storage, // use localStorage
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
