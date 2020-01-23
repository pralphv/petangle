import * as types from "./types";
import { SHORT_FORM_MAP } from "../../utils/constants";

const initState = {
  products: {}
};

export default function products(state = initState, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      const { products } = action.payload;

      return {
        ...state,
        products
      };

    case types.FETCH_PRODUCT_SUCCESS:
      var { productObj } = action.payload;

      return {
        ...state,
        products: {
          ...state.products,
          ...productObj
        }
      };

    case types.ADD_PRODUCT_SUCCESS:
      var { productObj } = action.payload;

      return {
        ...state,
        products: {
          ...state.products,
          ...productObj
        }
      };

    case types.INCREMENT_PRODUCT:
      var { productId, lOrDislike } = action.payload;

      return {
        ...state,
        products: {
          ...state.products,
          [productId]: {
            ...state.products[productId],
            [lOrDislike]: state.products[productId][lOrDislike] + 1
          }
        }
      };

    case types.DECREMENT_PRODUCT:
      var { productId, lOrDislike } = action.payload;

      return {
        ...state,
        products: {
          ...state.products,
          [productId]: {
            ...state.products[productId],
            [lOrDislike]: state.products[productId][lOrDislike] - 1
          }
        }
      };

    default:
      return state;
  }
}
