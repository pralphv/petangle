import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import { CustomSelect } from "../../components";
import { useLanguage } from "../../utils/customHooks";
import { NUTRITION_LANG } from "../../utils/constants";
import {
  productFilterActions,
} from "../../state/productFilter";

export const BrandSelectContainer = ({ filterBrand }) => {
  const brand = useSelector(state => state.productFilter.brand);
  const products = useSelector(state => state.product.products);
  const locale = useLanguage();

  const productsSet = new Set();
  Object.values(products).forEach(obj => {
    productsSet.add(obj.b);
  });

  return (
    <CustomSelect
      label={NUTRITION_LANG.b[locale]}
      id={NUTRITION_LANG.b.en}
      value={brand}
      listOfOptions={Array.from(productsSet).sort()}
      handleChangeRedux={filterBrand}
    />
  );
};

BrandSelectContainer.propTypes = {
  filterBrand: PropTypes.func.isRequired
};

BrandSelectContainer.defaultProps = {
  brand: ""
};

export default connect(null, {
  filterBrand: productFilterActions.filterBrand
})(BrandSelectContainer);
