import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

function ProductListPage() {
  const products = useSelector((state: any) => state.app.products);

  return (
    <div style={{ flex: 1, padding: "16px" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "8px" }}>
        {products.map((p: any) => (
          <ProductCard key={p.id} productId={p.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;