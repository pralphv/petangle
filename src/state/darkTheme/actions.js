import * as types from "./types";

const actionChangeTheme = () => ({
  type: types.CHANGE_THEME,
  payload: {
    
  }
});

export const changeTheme = () => dispatch => {
  dispatch(actionChangeTheme());
};

