import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { CustomSelect } from "../../components";
import {
  productFilterActions,
} from "../../state/productFilter";

export const FoodCategorySelectContainer = ({ filterFoodCategory }) => {
  const foodCategory = useSelector(state => state.productFilter.foodCategory);
  return (
    <CustomSelect
      label="Food Category"
      value={foodCategory}
      listOfOptions={["Dry Food", "Wet Food", "Snack"]}
      handleChangeRedux={filterFoodCategory}
    />
  );
};

FoodCategorySelectContainer.propTypes = {
  filterFoodCategory: PropTypes.func.isRequired
};

export default connect(null, {
  filterFoodCategory: productFilterActions.filterFoodCategory
})(FoodCategorySelectContainer);
