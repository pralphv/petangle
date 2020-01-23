import * as types from "./types";

const actionFilterAnimal = animal => ({
  type: types.FILTER_ANIMAL,
  payload: {
    animal
  }
});

const actionFilterBrand = brand => ({
  type: types.FILTER_BRAND,
  payload: {
    brand
  }
});

const actionFilterFoodCategory = foodCategory => ({
  type: types.FILTER_FOOD_CATEGORY,
  payload: {
    foodCategory
  }
});

export const filterAnimal = animal => dispatch => {
  dispatch(actionFilterAnimal(animal));
};

export const filterBrand = brand => dispatch => {
  dispatch(actionFilterBrand(brand));
};

export const filterFoodCategory = foodCategory => dispatch => {
  dispatch(actionFilterFoodCategory(foodCategory));
};
