import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { reducer as productReducer } from "./product";
import { reducer as productFilterReducer } from "./productFilter";
import { reducer as languageReducer } from "./language";
import { reducer as darkThemeReducer } from "./darkTheme";

export default combineReducers({
  firebase: firebaseReducer,
  product: productReducer,
  productFilter: productFilterReducer,
  language: languageReducer,
  theme: darkThemeReducer
});
