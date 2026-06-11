import Header from "./components/Header";
import ProductListPage from "./components/ProductListPage";
import CartSidebar from "./components/CartSidebar";

function App() {
  return (
    <div>
      <Header />
      <main>
        <ProductListPage />
        <CartSidebar />
      </main>
    </div>
  );
}

export default App;