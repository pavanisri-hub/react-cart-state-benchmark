import { useAppStore } from "../store/useAppStore";

type Props = {
  productId: number;
};

function CartItem({ productId }: Props) {
  const product = useAppStore((state) =>
    state.products.find((p) => p.id === productId)
  );
  const quantity = useAppStore(
    (state) =>
      state.cart.find((item) => item.productId === productId)?.quantity ?? 0
  );
  const removeFromCart = useAppStore((state) => state.removeFromCart);

  if (!product) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "4px",
      }}
    >
      <div>
        {product.name} x {quantity}
      </div>
      <button onClick={() => removeFromCart(product.id)}>Remove</button>
    </div>
  );
}

export default CartItem;