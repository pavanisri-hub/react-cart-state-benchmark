import { useAppStore } from "../store/useAppStore";

function CartItemCount() {
  const cart = useAppStore((state) => state.cart);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <div>Cart items: {count}</div>;
}

export default CartItemCount;