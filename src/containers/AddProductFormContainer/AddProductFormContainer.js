import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { AddProductForm, LoadingSpinner } from "../../components";
import { productsActions } from "../../state/product";
import { useUserId, useAllProducts } from "../../utils/customHooks";

function AddProductFormContainer({ fetchProducts, addProductToRedux, locale }) {
  const products = useAllProducts(fetchProducts);
  const firebase = useFirebase();
  const userId = useUserId();

  let alreadyExistsBrands = new Set();
  let brandToProductsMap = {};

  if (products) {
    Object.values(products).forEach(obj => {
      const brandKey = obj.b;
      if (!brandToProductsMap[brandKey]) {
        //inititate list
        brandToProductsMap[brandKey] = [];
      }
      brandToProductsMap[brandKey].push(obj.pr);
      alreadyExistsBrands.add(obj.b);
    });
  }

  return (Object.values(products).length > 0? 
    <AddProductForm
      alreadyExistsBrands={alreadyExistsBrands}
      brandToProductsMap={brandToProductsMap}
      addProductToRedux={addProductToRedux}
      firebase={firebase}
      userId={userId}
      locale={locale}
    />: <LoadingSpinner/>
  );
}

AddProductFormContainer.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  addProductToRedux: PropTypes.func.isRequired
};

export default connect(null, {
  fetchProducts: productsActions.fetchProducts,
  addProductToRedux: productsActions.addProduct
})(AddProductFormContainer);
