import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Cards, EmptyPage } from "../../components";
import { productsActions } from "../../state/product";
import { useSelectedProducts } from "../../utils/customHooks";

const labelMap = {
  saved: {
    empty: "You have not saved any products",
    label: "SAVED"
  },
  submittedProduct: {
    empty: "You have not submitted any products",
    label: "SUBMITTED"
  }
};

export const ProductCardsPageContainer = ({ page, fetchProduct }) => {
  const history = useHistory();
  const products_ = useSelector(state => state.firebase.profile[page]) || [];
  const inputProducts = Object.values(products_).map(obj => obj.pi);
  const productsToShow = useSelectedProducts(inputProducts, fetchProduct);
  return Object.keys(productsToShow).length > 0 ? (
    <Cards
      productsObj={productsToShow}
      history={history}
      label={labelMap[page].label}
    />
  ) : (
    <EmptyPage text={labelMap[page].empty} />
  );
};

ProductCardsPageContainer.propTypes = {
  page: PropTypes.string.isRequired,
  fetchProduct: PropTypes.func.isRequired
};

export default connect(null, {
  fetchProduct: productsActions.fetchProduct
})(ProductCardsPageContainer);
