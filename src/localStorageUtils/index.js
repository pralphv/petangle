import { LANGUAGE, LAST_QUERY_TIME, PRODUCT_LIST, THEME } from "./constants";

function getFromLocalStorage(item) {
  const data = localStorage.getItem(item);
  return data;
}

function setToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getLastQueryTime() {
  const lastQueryTime = getFromLocalStorage(LAST_QUERY_TIME) || 0;
  return parseInt(lastQueryTime);
}

export function setLastQueryTime(dbLastQueryTime) {
  setToLocalStorage(LAST_QUERY_TIME, dbLastQueryTime);
}

export function getProductsObject() {
  const productsObject = getFromLocalStorage(PRODUCT_LIST);
  return JSON.parse(productsObject);
}

export function setProductsObject(productsObject) {
  setToLocalStorage(PRODUCT_LIST, JSON.stringify(productsObject));
}

export function setLanguageLocalStorage(language) {
  setToLocalStorage(LANGUAGE, language)
}

export function getLanguage() {
  return getFromLocalStorage(LANGUAGE);
}

export function setTheme(theme) {
  setToLocalStorage(THEME, theme)
}


export function getTheme() {
  return getFromLocalStorage(THEME)
}