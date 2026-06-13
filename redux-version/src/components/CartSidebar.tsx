import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartSidebar() {
  const cart = useSelector((state: any) => state.app.cart);

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
        {cart.map((item: any) => (
          <CartItem key={item.productId} productId={item.productId} />
        ))}
      </div>
      <CartSummary />
    </aside>
  );
}

export default CartSidebar;