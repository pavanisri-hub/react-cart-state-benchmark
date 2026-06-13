import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/appSlice";

function ThemeSwitcher() {
  const theme = useSelector((state: any) => state.app.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Theme: {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeSwitcher;