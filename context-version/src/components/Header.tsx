import { useRef } from "react";
import UserInfo from "./UserInfo";
import CartItemCount from "./CartItemCount";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppContext } from "../context/AppContext";

function Header() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const { state, dispatch } = useAppContext();

  const totalItems = state.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleToggleCart = () => {
    dispatch({ type: "cart/toggleOpen" });
  };

  return (
    <header style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <UserInfo />
      <CartItemCount count={totalItems} />
      <ThemeSwitcher />
      <button onClick={handleToggleCart}>
        {state.cart.isOpen ? "Close Cart" : "Open Cart"}
      </button>

      {import.meta.env.DEV && (
        <small data-testid="render-count" style={{ marginLeft: "auto" }}>
          {renderCountRef.current}
        </small>
      )}
    </header>
  );
}

export default Header;