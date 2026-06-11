import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

type CartItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "cart/addItem"; payload: CartItem }
  | { type: "cart/removeItem"; payload: { productId: string } }
  | { type: "cart/updateQuantity"; payload: { productId: string; quantity: number } }
  | { type: "cart/toggleOpen" };

const initialCartState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "cart/addItem": {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      let items: CartItem[];
      if (existing) {
        items = state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        items = [...state.items, action.payload];
      }
      return { ...state, items };
    }
    case "cart/removeItem": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    }
    case "cart/updateQuantity": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "cart/toggleOpen": {
      return { ...state, isOpen: !state.isOpen };
    }
    default:
      return state;
  }
}

type CartContextValue = {
  cart: CartState;
  dispatchCart: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatchCart] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return ctx;
}