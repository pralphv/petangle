import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { CustomSelect } from "../../components";
import {
  productFilterActions,
} from "../../state/productFilter";
import { MISC_LANG } from "../../utils/constants";
import { useLanguage } from "../../utils/customHooks";

export const FoodCategorySelectContainer = ({ filterFoodCategory }) => {
  const foodCategory = useSelector(state => state.productFilter.foodCategory);
  const locale = useLanguage();

  return (
    <CustomSelect
      label={MISC_LANG.fc[locale]}
      id={MISC_LANG.fc.en}
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
