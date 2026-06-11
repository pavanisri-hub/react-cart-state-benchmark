import { useAppContext } from "../context/AppContext";

function CartSummary() {
  const { state } = useAppContext();
  const { items } = state.cart;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: "1rem" }}>
      <p>Subtotal: ${subtotal}</p>
      <button disabled={items.length === 0}>Checkout</button>
    </div>
  );
}

export default CartSummary;