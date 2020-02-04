import React from "react";

import { ProductDetailsTableContainer, CardsContainer } from "../../containers";
import Toolbar from "./Toolbar";
import TextSeparator from "./TextSeparator";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  whiteBacgkround: {
    background: "#fff"
  }
}));

function ProductPage(props) {
  const classes = useStyles();
  const productId = props.match.params.id;

  return (
    <div style={{background: "#fff"}} >
      <ProductDetailsTableContainer productId={productId} />
      <Toolbar productId={productId} />
      <TextSeparator text="Pets that like this product also like:" />
      <CardsContainer productId={productId} likeOrDislike="like" />
      <TextSeparator text="Pets that dislike this product also dislike:" />
      <CardsContainer productId={productId} likeOrDislike="dislike" />
    </div>
  );
}

export default ProductPage;
