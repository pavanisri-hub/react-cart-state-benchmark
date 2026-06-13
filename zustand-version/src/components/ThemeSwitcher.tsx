import { useAppStore } from "../store/useAppStore";

function ThemeSwitcher() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <button onClick={toggleTheme}>
      Theme: {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeSwitcher;