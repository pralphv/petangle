import * as types from "./types";

export const actionChangeLanguage = language => ({
  type: types.CHANGE_LANGUAGE,
  payload: {
    language
  }
});

export const changeLanguage = language => dispatch => {
  dispatch(actionChangeLanguage(language));
};

const actionChangeLanguageUrl = () => ({
  type: types.CHANGE_LANGUAGE_URL,
  payload: {
    
  }
});

export const changeLanguageUrl = () => dispatch => {
  dispatch(actionChangeLanguageUrl());
};

