import { useRef, useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS = [
  { id: "p1", name: "Product 1", price: 10 },
  { id: "p2", name: "Product 2", price: 20 },
  { id: "p3", name: "Product 3", price: 30 },
];

function ProductListPage() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const [test, setTest] = useState(0);

  return (
    <section style={{ padding: "1rem" }}>
      <h2>Products</h2>
      {import.meta.env.DEV && (
        <small data-testid="render-count">Renders: {renderCountRef.current}</small>
      )}
      <button onClick={() => setTest((t) => t + 1)}>Test rerender ({test})</button>
      <div style={{ display: "flex", gap: "1rem" }}>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default ProductListPage;