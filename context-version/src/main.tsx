import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { UIProvider } from "./context/UIContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <UIProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UIProvider>
    </UserProvider>
  </React.StrictMode>
);