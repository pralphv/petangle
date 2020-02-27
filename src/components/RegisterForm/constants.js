import { MISC_LANG } from "../../utils/constants";

export const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

export const FORM_FIELD_ORDER = {
  username: {en: "Username", zh: "用戶名稱", jp: "ユーザー名"} ,
  email: MISC_LANG.email ,
  passwordOne: MISC_LANG.password ,
  passwordTwo: {en: "Confirm Password", zh: "確認密碼", jp: "パスワード確認"} ,
};
