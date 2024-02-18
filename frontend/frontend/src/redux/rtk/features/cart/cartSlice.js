import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // make a function to clear the cart
    clearCart: (state, action) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },

    loadCartFromStorage: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      const cartInStorage = JSON.parse(localStorage.getItem("cart"));

      let itemInCartStorage = cartInStorage.find(
        (item) => item.id === action.payload.id,
      );

      if (itemInCart) {
        itemInCart.quantity = action.payload.quantity;
        itemInCartStorage.quantity = action.payload.quantity;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
        cartInStorage.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
      toast.success("Item added to cart");
    },
    removeItem: (state, action) => {
      const filteredItems = state.cart.filter(
        (item) => item.id !== action.payload,
      );

      const cartInStorage1 = JSON.parse(localStorage.getItem("cart"));
      const filteredCartItems = cartInStorage1.filter(
        (item) => item.id !== action.payload,
      );

      state.cart = filteredItems;
      localStorage.setItem("cart", JSON.stringify(filteredCartItems));
      toast.warning("Item removed from cart");
    },
  },
});

export default cartSlice.reducer;
export const { loadCartFromStorage, addToCart, removeItem, clearCart } =
  cartSlice.actions;
