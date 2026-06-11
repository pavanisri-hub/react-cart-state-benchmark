import { useRef } from "react";
import { useCartContext } from "../context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const { dispatchCart } = useCartContext();

  const handleAddToCart = () => {
    dispatchCart({
      type: "cart/addItem",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "0.5rem",
        borderRadius: "4px",
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {import.meta.env.DEV && (
        <small data-testid="render-count">
          Renders: {renderCountRef.current}
        </small>
      )}
    </div>
  );
}

export default ProductCard;