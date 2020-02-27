import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ProductsTable, LoadingSpinner } from "../../components";
import { productsActions } from "../../state/product";
import { useAllProducts, useLanguage } from "../../utils/customHooks";

export const ProductsTableContainer = ({ fetchProducts }) => {
  const history = useHistory();
  const locale = useLanguage();

  const foodCategory = useSelector(state => state.productFilter.foodCategory);
  const animal = useSelector(state => state.productFilter.animal);
  const brand = useSelector(state => state.productFilter.brand);
  const products = useAllProducts(fetchProducts);

  const filter = {
    animal: animal,
    brand: brand,
    foodCategory: foodCategory
  };

  const productsList = [];
  Object.entries(products).forEach(([key, obj]) => {
    obj.id = key;
    productsList.push(obj);
  });
  return Object.keys(products).length > 0 ? (
    <ProductsTable
      locale={locale}
      data={productsList}
      filter={filter}
      history={history}
    />
  ) : (
    <LoadingSpinner />
  );
};

ProductsTableContainer.propTypes = {
  fetchProducts: PropTypes.func.isRequired
};

export default connect(null, {
  fetchProducts: productsActions.fetchProducts
})(ProductsTableContainer);
