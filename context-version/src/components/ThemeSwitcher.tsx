import { useUIContext } from "../context/UIContext";

function ThemeSwitcher() {
  const { ui, dispatchUI } = useUIContext();

  const toggleTheme = () => {
    dispatchUI({
      type: "ui/setTheme",
      payload: { theme: ui.theme === "light" ? "dark" : "light" },
    });
  };

  return (
    <button onClick={toggleTheme}>
      Theme: {ui.theme === "light" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeSwitcher;