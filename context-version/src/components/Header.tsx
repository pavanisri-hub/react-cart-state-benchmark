import { useRef } from "react";
import UserInfo from "./UserInfo";
import CartItemCount from "./CartItemCount";
import ThemeSwitcher from "./ThemeSwitcher";
import { useCartContext } from "../context/CartContext";

function Header() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const { cart, dispatchCart } = useCartContext();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleToggleCart = () => {
    dispatchCart({ type: "cart/toggleOpen" });
  };

  return (
    <header style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <UserInfo />
      <CartItemCount count={totalItems} />
      <ThemeSwitcher />
      <button onClick={handleToggleCart}>
        {cart.isOpen ? "Close Cart" : "Open Cart"}
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