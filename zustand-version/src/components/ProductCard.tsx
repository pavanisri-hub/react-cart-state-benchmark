import { useAppStore } from "../store/useAppStore";

type Props = {
  productId: number;
};

function ProductCard({ productId }: Props) {
  const product = useAppStore((state) =>
    state.products.find((p) => p.id === productId)
  );
  const addToCart = useAppStore((state) => state.addToCart);

  if (!product) return null;

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
      <button onClick={() => addToCart(product.id)}>Add to cart</button>
    </div>
  );
}

export default ProductCard;