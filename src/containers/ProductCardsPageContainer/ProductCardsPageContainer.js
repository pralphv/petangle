import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useLanguage } from "../../utils/customHooks";
import { Cards, EmptyPage } from "../../components";
import { productsActions } from "../../state/product";
import { useSelectedProducts } from "../../utils/customHooks";

const labelMap = {
  saved: {
    empty: {
      en: "You have not saved any products",
      jp: "製品はまた保存していません",
      zh: "你還沒有儲存任何產品"
    },
    label: {
      en: "SAVED",
      jp: "保存した",
      zh: "已儲存"
    }
  },
  submittedProduct: {
    empty: {
      en: "You have not submitted any products",
      jp: "製品はまた提出していません",
      zh: "你還沒有提交任何產品"
    },
    label: {
      en: "SUBMITTED",
      jp: "提出した",
      zh: "已提交"
    }
  }
};

export const ProductCardsPageContainer = ({ page, fetchProduct }) => {
  const locale = useLanguage();
  const history = useHistory();
  const products_ = useSelector(state => state.firebase.profile[page]) || [];

  const inputProducts = Object.values(products_).map(obj => obj.pi);
  const productsToShow = useSelectedProducts(inputProducts, fetchProduct);

  return Object.keys(productsToShow).length > 0 ? (
    <Cards
      productsObj={productsToShow}
      history={history}
      label={labelMap[page].label[locale]}
    />
  ) : (
    <EmptyPage text={labelMap[page].empty[locale]} />
  );
};

ProductCardsPageContainer.propTypes = {
  page: PropTypes.string.isRequired,
  fetchProduct: PropTypes.func.isRequired
};

export default connect(null, {
  fetchProduct: productsActions.fetchProduct
})(ProductCardsPageContainer);
