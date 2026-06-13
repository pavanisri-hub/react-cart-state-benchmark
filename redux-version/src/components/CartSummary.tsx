import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/appSlice";

function CartSummary() {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.app.cart);
  const products = useSelector((state: any) => state.app.products);

  const total = cart.reduce((sum: number, item: any) => {
    const product = products.find((p: any) => p.id === item.productId);
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div style={{ marginTop: "16px" }}>
      <div>Total: {total}</div>
      <button onClick={() => dispatch(clearCart())} disabled={cart.length === 0}>
        Clear cart
      </button>
    </div>
  );
}

export default CartSummary;