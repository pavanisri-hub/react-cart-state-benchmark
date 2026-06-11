type Props = {
  count: number;
};

function CartItemCount({ count }: Props) {
  return <div>Cart items: {count}</div>;
}

export default CartItemCount;