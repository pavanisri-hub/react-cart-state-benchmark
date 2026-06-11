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

type UserState = {
  name: string;
  isLoggedIn: boolean;
};

type Notification = {
  message: string;
  type: string;
};

type UIState = {
  theme: "light" | "dark";
  notification: Notification | null;
};

type AppState = {
  cart: CartState;
  user: UserState;
  ui: UIState;
};

type AppAction =
  | { type: "cart/addItem"; payload: CartItem }
  | { type: "cart/removeItem"; payload: { productId: string } }
  | { type: "cart/updateQuantity"; payload: { productId: string; quantity: number } }
  | { type: "cart/toggleOpen" }
  | { type: "user/login"; payload: { name: string } }
  | { type: "user/logout" }
  | { type: "ui/setTheme"; payload: { theme: "light" | "dark" } }
  | { type: "ui/showNotification"; payload: Notification }
  | { type: "ui/clearNotification" };

const initialState: AppState = {
  cart: {
    items: [],
    isOpen: false,
  },
  user: {
    name: "Guest",
    isLoggedIn: false,
  },
  ui: {
    theme: "light",
    notification: null,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "cart/addItem": {
      const existing = state.cart.items.find(
        (item) => item.productId === action.payload.productId
      );
      let items: CartItem[];
      if (existing) {
        items = state.cart.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        items = [...state.cart.items, action.payload];
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          items,
        },
      };
    }
    case "cart/removeItem": {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.filter(
            (item) => item.productId !== action.payload.productId
          ),
        },
      };
    }
    case "cart/updateQuantity": {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        },
      };
    }
    case "cart/toggleOpen": {
      return {
        ...state,
        cart: {
          ...state.cart,
          isOpen: !state.cart.isOpen,
        },
      };
    }
    case "user/login": {
      return {
        ...state,
        user: {
          name: action.payload.name,
          isLoggedIn: true,
        },
      };
    }
    case "user/logout": {
      return {
        ...state,
        user: {
          name: "Guest",
          isLoggedIn: false,
        },
      };
    }
    case "ui/setTheme": {
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: action.payload.theme,
        },
      };
    }
    case "ui/showNotification": {
      return {
        ...state,
        ui: {
          ...state.ui,
          notification: action.payload,
        },
      };
    }
    case "ui/clearNotification": {
      return {
        ...state,
        ui: {
          ...state.ui,
          notification: null,
        },
      };
    }
    default:
      return state;
  }
}

type AppContextValue = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return ctx;
}