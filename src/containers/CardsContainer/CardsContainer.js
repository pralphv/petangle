import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Cards } from "../../components";
import { fetchProductPreference } from "../../firebase/crud";
import { getTop5Keys } from "../../utils/helper";
import { productsActions } from "../../state/product";

export const CardsContainer = ({
  productId,
  likeOrDislike,
  fetchProduct
}) => {
  const firebase = useFirebase();
  const history = useHistory();

  const [top5IdsState, setTop5IdsState] = useState([]);
  const products = useSelector(state => state.product.products);
  const productsAlreadyLoaded = new Set(Object.keys(products));

  useEffect(() => {
    async function fetchData() {
      let respObj = await fetchProductPreference(
        firebase,
        productId,
        likeOrDislike
      );
      const top5Ids = getTop5Keys(respObj);
      setTop5IdsState(top5Ids);
      top5Ids.forEach(id => {
        if (!productsAlreadyLoaded.has(id)) {
          fetchProduct(id);
        }
      });
    }
    fetchData();
  }, [productId]);

  let selectedProductObj = {};
  top5IdsState.forEach(id => {
    selectedProductObj[id] = products[id];
  });

  return (
    <Cards
      productsObj={selectedProductObj}
      history={history}
      icon={likeOrDislike}
    />
  );
};

CardsContainer.propTypes = {
  productId: PropTypes.string.isRequired,
  likeOrDislike: PropTypes.string.isRequired,
  fetchProduct: PropTypes.func.isRequired
};


export default connect(null, {
  fetchProduct: productsActions.fetchProduct
})(CardsContainer);
