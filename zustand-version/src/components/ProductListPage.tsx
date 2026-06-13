import ProductCard from "./ProductCard";
import { useAppStore } from "../store/useAppStore";
import { useRenderMetrics } from "../hooks/useRenderMetrics";

function ProductListPage() {
  useRenderMetrics("ProductListPage");
  const products = useAppStore((state) => state.products);

  return (
    <div style={{ flex: 1, padding: "16px" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "8px" }}>
        {products.map((p) => (
          <ProductCard key={p.id} productId={p.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;