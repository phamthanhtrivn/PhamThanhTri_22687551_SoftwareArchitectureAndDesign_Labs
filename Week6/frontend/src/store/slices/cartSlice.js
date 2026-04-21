// store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const food = action.payload;
      const exist = state.items.find((i) => i.id === food.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({
          id: food.id,
          name: food.name,
          price: food.price,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity++;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  toggleCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
