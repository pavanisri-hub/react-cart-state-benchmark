import { useSelector } from "react-redux";

function CartItemCount() {
  const cart = useSelector((state: any) => state.app.cart);
  const count = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return <div>Cart items: {count}</div>;
}

export default CartItemCount;