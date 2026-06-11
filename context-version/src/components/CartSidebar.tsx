import { useRef } from "react";
import { useCartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartSidebar() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const { cart } = useCartContext();
  const { items, isOpen } = cart;

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      style={{
        borderLeft: "1px solid #ccc",
        padding: "1rem",
        minWidth: "280px",
      }}
    >
      <h2>Cart</h2>
      {import.meta.env.DEV && (
        <small data-testid="render-count">
          Renders: {renderCountRef.current}
        </small>
      )}
      <div>
        {items.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          items.map((item) => <CartItem key={item.productId} item={item} />)
        )}
      </div>
      <CartSummary />
    </aside>
  );
}

export default CartSidebar;