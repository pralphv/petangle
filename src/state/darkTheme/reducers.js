import * as types from "./types";
import { getTheme, setTheme } from "../../localStorageUtils";

function determineFirstThemeState() {
  const theme = getTheme();
  if (theme) {
    console.log(`Theme from Locale Storage: ${theme}`);
    return theme;
  } else {
    console.log(`Default theme: light`);
    return "light";
  }
}

const initState = {
  theme: determineFirstThemeState() || "light"
};

export default function darkTheme(state = initState, action) {
  switch (action.type) {
    case types.CHANGE_THEME:
      const newState = state.theme === "light" ? "dark" : "light";
      setTheme(newState);
      window.location.reload();
      return {
        theme: newState
      };

    default:
      return state;
  }
}
