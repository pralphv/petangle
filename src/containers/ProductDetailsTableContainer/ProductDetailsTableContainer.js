import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ProductDetailsTable, LoadingSpinner } from "../../components";
import { productsActions } from "../../state/product";
import { useSelectedProducts } from "../../utils/customHooks";

const ProductDetailsTableContainer = ({ productId, fetchProduct }) => {
  const productsObj = useSelectedProducts([productId], fetchProduct, productId);
  const productDetails = productsObj[productId];
  return productDetails ? (
    <ProductDetailsTable productDetails={productDetails}/>
  ) : <LoadingSpinner/>;
};

ProductDetailsTableContainer.propTypes = {
  productId: PropTypes.string.isRequired,
  fetchProduct: PropTypes.func.isRequired
};

export default connect(null, {
  fetchProduct: productsActions.fetchProduct
})(ProductDetailsTableContainer);
