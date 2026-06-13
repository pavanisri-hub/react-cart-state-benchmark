import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export type User = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  productId: number;
  quantity: number;
};

type AppState = {
  theme: Theme;
  user: User | null;
  products: Product[];
  cart: CartItem[];
};

const initialProducts: Product[] = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

const initialState: AppState = {
  theme: "light",
  user: { id: 1, name: "John Doe" },
  products: initialProducts,
  cart: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    addToCart(state, action: PayloadAction<number>) {
      const productId = action.payload;
      const existing = state.cart.find((i) => i.productId === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ productId, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload;
      state.cart = state.cart.filter((i) => i.productId !== productId);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  toggleTheme,
  setUser,
  addToCart,
  removeFromCart,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;