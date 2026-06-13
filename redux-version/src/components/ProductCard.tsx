import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/appSlice";

type Props = {
  productId: number;
};

function ProductCard({ productId }: Props) {
  const dispatch = useDispatch();

  const product = useSelector((state: any) =>
    state.app.products.find((p: any) => p.id === productId)
  );

  if (!product) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        minWidth: "120px",
      }}
    >
      <div>{product.name}</div>
      <div>Price: {product.price}</div>
      <button onClick={() => dispatch(addToCart(product.id))}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;