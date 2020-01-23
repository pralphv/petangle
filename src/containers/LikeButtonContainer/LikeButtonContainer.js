import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";

import { productsActions } from "../../state/product";
import { LikeButton } from "../../components";
import { useUserId } from "../../utils/customHooks";
import { SHORT_FORM_MAP, LIKED_POINT } from "../../utils/constants";

import {
  likeOrDislikeProduct,
  unlikeProduct,
  addLikeCount,
  addPreferenceCount,
  addContributionPoint
} from "../../firebase/crud";

function extractProductIds(obj) {
  let alreadyLikedProducts;
  try {
    alreadyLikedProducts = Object.values(obj).map(obj_ => obj_.pi);
  } catch {
    alreadyLikedProducts = [];
  }
  alreadyLikedProducts = new Set(alreadyLikedProducts);
  return alreadyLikedProducts;
}

function LikeButtonContainer({
  likeOrDislike,
  productId,
  reduxIncrementProductLike,
  reduxDecrementProductLike
}) {
  // product would be fetched through ProductDetailsTableContainer.
  // this LikeButtonContainer will only exist with ProductDetailsTableContainer,
  // so not fetching products in this container is fine
  const product = useSelector(
    state => state.product && state.product.products[productId]
  );
  const pets = useSelector(state => state.firebase.profile.pets);
  const firebase = useFirebase();
  const userId = useUserId();

  const shortForm = SHORT_FORM_MAP[likeOrDislike];
  const reverseLOrDl = shortForm === "l" ? "dl" : "l";
  let value = 0;
  if (product) {
    value = shortForm === "l" ? product.l : product.dl;
  }

  if (pets) {
    Object.entries(pets).forEach(([key, value]) => {
      pets[key][`already_${shortForm}`] = extractProductIds(value[shortForm]);
    });
  }

  async function handleOnClickCancelLike(petId) {
    const { status, deleted } = await unlikeProduct(
      firebase,
      userId,
      petId,
      productId,
      shortForm
    );
    addLikeCount(firebase, productId, shortForm, -1);
    reduxDecrementProductLike(productId, shortForm);
    incrementLikedProducts(petId, shortForm, -1);
    addContributionPoint(firebase, -LIKED_POINT, userId)
  }
  
  async function handleOnClick(petId) {
    // Steps:
    // 1. like
    // 2. increment like count in product obj
    // 3. increment like count in preference

    // Reverting:
    // 1. unlike
    // 2. if unlike is successful, that means it was liked before
    // 3. revert all like operations
    const { status, deleted } = await unlikeProduct(
      firebase,
      userId,
      petId,
      productId,
      reverseLOrDl
    );

    if (deleted) {
      addLikeCount(firebase, productId, reverseLOrDl, -1);
      reduxDecrementProductLike(productId, reverseLOrDl);
      incrementLikedProducts(petId, reverseLOrDl, -1);
      addContributionPoint(firebase, -LIKED_POINT, userId)
    }
    likeOrDislikeProduct(firebase, userId, petId, productId, shortForm);
    addLikeCount(firebase, productId, shortForm, 1);
    reduxIncrementProductLike(productId, shortForm);
    incrementLikedProducts(petId, shortForm, 1);
    addContributionPoint(firebase, LIKED_POINT, userId)
  }

  async function incrementLikedProducts(petId, likeOrDislike, value) {
    pets[petId][`already_${likeOrDislike}`].forEach(productId2 => {
      if (productId !== productId2) {
        addPreferenceCount(
          firebase,
          productId,
          productId2,
          likeOrDislike,
          value
        );
        addPreferenceCount(
          firebase,
          productId2,
          productId,
          likeOrDislike,
          value
        );
      }
    });
  }

  return (
    <LikeButton
      pets={pets}
      lOrDl={shortForm}
      value={value}
      handleOnClick={handleOnClick}
      handleOnClickCancelLike={handleOnClickCancelLike}
      productId={productId}
    />
  );
}

LikeButtonContainer.propTypes = {
  likeOrDislike: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired
};

export default connect(null, {
  reduxIncrementProductLike: productsActions.incrementProductLike,
  reduxDecrementProductLike: productsActions.decrementProductLike
})(LikeButtonContainer);
