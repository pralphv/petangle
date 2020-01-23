import * as types from "./types";
import {
  getLastQueryTime,
  getProductsObject,
  setLastQueryTime,
  setProductsObject
} from "../../localStorageUtils";
import {
  fetchLastUpdateTime,
  fetchProductsObject,
  fetchProductDetails
} from "../../firebase/crud";

const actionAddProductSuccess = productObj => ({
  type: types.ADD_PRODUCT_SUCCESS,
  payload: {
    productObj
  }
});
const actionFetchProductSuccess = productObj => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload: {
    productObj
  }
});

const actionFetchProductsSuccess = products => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: {
    products
  }
});

const actionIncrementProductLike = (productId, lOrDislike) => ({
  type: types.INCREMENT_PRODUCT,
  payload: {
    productId,
    lOrDislike
  }
});

const actionDecrementProductLike = (productId, lOrDislike) => ({
  type: types.DECREMENT_PRODUCT,
  payload: {
    productId,
    lOrDislike
  }
});

export const fetchProducts = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  let productsObject = {};
  const firebase = getFirebase();
  const dbLastUpdateTime = await fetchLastUpdateTime(firebase);
  const lastQueryTime = getLastQueryTime();

  // maybe add if longer than 1 day, then update?
  if (lastQueryTime === dbLastUpdateTime) {
    console.log("GETTING FROM LOCAL STORAGE");
    productsObject = getProductsObject();
  } else {
    console.log("GETTING FROM FB");
    productsObject = await fetchProductsObject(firebase);
    setProductsObject(productsObject);
    setLastQueryTime(dbLastUpdateTime);
  }

  dispatch(actionFetchProductsSuccess(productsObject));
};

export const fetchProduct = productId => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  let productObject = await fetchProductDetails(firebase, productId);
  productObject = { [productId]: productObject };
  dispatch(actionFetchProductSuccess(productObject));
};

export const addProduct = productObj => dispatch => {
  dispatch(actionAddProductSuccess(productObj));
};

export const incrementProductLike = (productId, lOrDislike) => dispatch => {
  dispatch(actionIncrementProductLike(productId, lOrDislike));
};

export const decrementProductLike = (productId, lOrDislike) => dispatch => {
  dispatch(actionDecrementProductLike(productId, lOrDislike));
};
