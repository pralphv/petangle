import * as types from "./types";
import { getLanguage } from "../../localStorageUtils";

function determineFirstLanguageState() {
  const url = window.location.href;
  const splitted = url.split("/");
  const urlLanguage = splitted[3];
  if (urlLanguage.length == 2 && urlLanguage) {
    console.log(`Locale from URL: ${urlLanguage}`);
    return urlLanguage;
  }
  const localStorageLanguage = getLanguage();
  if (localStorageLanguage) {
    console.log(`Locale from Locale Storage: ${urlLanguage}`);
    return localStorageLanguage;
  }
  return "en";
}

const initState = {
  language: determineFirstLanguageState() || "en"
};

export default function language(state = initState, action) {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      const { language } = action.payload;

      return {
        ...state,
        language
      };

    case types.CHANGE_LANGUAGE_URL:
      console.log(window.location.pathname);

      return {
        ...state
      };

    default:
      return state;
  }
}
