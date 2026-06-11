import { useRef } from "react";
import { useCartContext } from "../context/CartContext";

type CartItemProps = {
  item: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  };
};

function CartItem({ item }: CartItemProps) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const { dispatchCart } = useCartContext();

  const handleChangeQuantity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = Number(event.target.value) || 0;
    dispatchCart({
      type: "cart/updateQuantity",
      payload: { productId: item.productId, quantity },
    });
  };

  const handleRemove = () => {
    dispatchCart({
      type: "cart/removeItem",
      payload: { productId: item.productId },
    });
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        marginBottom: "0.5rem",
      }}
    >
      <span>{item.name}</span>
      <input
        type="number"
        min={0}
        value={item.quantity}
        onChange={handleChangeQuantity}
        style={{ width: "3rem" }}
      />
      <span>${lineTotal}</span>
      <button onClick={handleRemove}>Remove</button>
      {import.meta.env.DEV && (
        <small data-testid="render-count">
          Renders: {renderCountRef.current}
        </small>
      )}
    </div>
  );
}

export default CartItem;