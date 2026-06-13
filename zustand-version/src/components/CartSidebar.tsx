import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useAppStore } from "../store/useAppStore";
import { useRenderMetrics } from "../hooks/useRenderMetrics";

function CartSidebar() {
  useRenderMetrics("CartSidebar");

  const cart = useAppStore((state) => state.cart);

  return (
    <aside
      style={{
        width: "260px",
        borderLeft: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <h2>Cart</h2>
      <div>
        {cart.length === 0 && <div>No items in cart</div>}
        {cart.map((item) => (
          <CartItem key={item.productId} productId={item.productId} />
        ))}
      </div>
      <CartSummary />
    </aside>
  );
}

export default CartSidebar;