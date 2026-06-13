import { useAppStore } from "../store/useAppStore";

function CartSummary() {
  const cart = useAppStore((state) => state.cart);
  const products = useAppStore((state) => state.products);
  const clearCart = useAppStore((state) => state.clearCart);

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div style={{ marginTop: "16px" }}>
      <div>Total: {total}</div>
      <button onClick={clearCart} disabled={cart.length === 0}>
        Clear cart
      </button>
    </div>
  );
}

export default CartSummary;