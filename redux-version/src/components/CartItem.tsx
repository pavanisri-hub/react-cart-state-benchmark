import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/appSlice";

type Props = {
  productId: number;
};

function CartItem({ productId }: Props) {
  const dispatch = useDispatch();

  const product = useSelector((state: any) =>
    state.app.products.find((p: any) => p.id === productId)
  );

  const quantity = useSelector(
    (state: any) =>
      state.app.cart.find((i: any) => i.productId === productId)?.quantity ?? 0
  );

  if (!product) {
    return null;
  }

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
      <button onClick={() => dispatch(removeFromCart(product.id))}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;