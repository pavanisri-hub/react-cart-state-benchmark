import { useAppContext } from "../context/AppContext";

function ThemeSwitcher() {
  const { state, dispatch } = useAppContext();
  const { theme } = state.ui;

  const toggleTheme = () => {
    dispatch({
      type: "ui/setTheme",
      payload: { theme: theme === "light" ? "dark" : "light" },
    });
  };

  return (
    <button onClick={toggleTheme}>
      Theme: {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeSwitcher;