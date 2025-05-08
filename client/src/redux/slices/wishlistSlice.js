import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('wishlist');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (e) {
    console.error("Could not save wishlist:", e);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex(item => item.productNumber === action.payload.productNumber);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        const newItem = { ...action.payload, addedAt: new Date().toISOString() };
        state.items.push(newItem);
      }
      saveToLocalStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.productNumber !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
