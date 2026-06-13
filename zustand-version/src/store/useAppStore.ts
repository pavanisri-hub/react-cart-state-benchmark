import { create } from "zustand";

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

type AppActions = {
  toggleTheme: () => void;
  setUser: (user: User | null) => void;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const initialProducts: Product[] = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

export const useAppStore = create<AppState & AppActions>((set) => ({
  theme: "light",
  user: { id: 1, name: "John Doe" },
  products: initialProducts,
  cart: [],
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setUser: (user) => set({ user }),
  addToCart: (productId) =>
    set((state) => {
      const existing = state.cart.find((item) => item.productId === productId);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { productId, quantity: 1 }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));