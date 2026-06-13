import UserInfo from "./UserInfo";
import ThemeSwitcher from "./ThemeSwitcher";
import CartItemCount from "./CartItemCount";
import { useRenderMetrics } from "../hooks/useRenderMetrics";


function Header() {
  useRenderMetrics("Header");

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div>My Store</div>
      <UserInfo />
      <ThemeSwitcher />
      <CartItemCount />
    </header>
  );
}

export default Header;