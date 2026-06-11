import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

type Notification = {
  message: string;
  type: string;
};

type UIState = {
  theme: "light" | "dark";
  notification: Notification | null;
};

type UIAction =
  | { type: "ui/setTheme"; payload: { theme: "light" | "dark" } }
  | { type: "ui/showNotification"; payload: Notification }
  | { type: "ui/clearNotification" };

const initialUIState: UIState = {
  theme: "light",
  notification: null,
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "ui/setTheme":
      return { ...state, theme: action.payload.theme };
    case "ui/showNotification":
      return { ...state, notification: action.payload };
    case "ui/clearNotification":
      return { ...state, notification: null };
    default:
      return state;
  }
}

type UIContextValue = {
  ui: UIState;
  dispatchUI: React.Dispatch<UIAction>;
};

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [ui, dispatchUI] = useReducer(uiReducer, initialUIState);

  return (
    <UIContext.Provider value={{ ui, dispatchUI }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUIContext must be used within UIProvider");
  }
  return ctx;
}