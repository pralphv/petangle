import * as types from "./types";

const initState = {
  animal: "",
  brand: "",
  foodCategory: ""
};

export default function productFilter(state = initState, action) {
  switch (action.type) {
    case types.FILTER_ANIMAL:
      const { animal } = action.payload;

      return {
        ...state,
        animal
      };
    case types.FILTER_BRAND:
      const { brand } = action.payload;

      return {
        ...state,
        brand
      };
    case types.FILTER_FOOD_CATEGORY:
      const { foodCategory } = action.payload;

      return {
        ...state,
        foodCategory
      };

    default:
      return state;
  }
}
