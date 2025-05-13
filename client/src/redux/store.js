import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";

const persistConfig = {
  key: "auth",
  storage: storage, 
  whitelist: ["user", "isAuthenticated"], 
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
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
