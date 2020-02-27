import React from "react";

import { useLanguage } from "../../utils/customHooks";
import { ProductDetailsTableContainer, CardsContainer } from "../../containers";
import Toolbar from "./Toolbar";
import TextSeparator from "./TextSeparator";

const TEXT = {
  like: {
    en: "Pets that like this product also like:",
    zh: "喜歡這產品的寵物也喜歡:",
    jp: "この製品が好きなペットがこれらも好き:"
  },
  dislike: {
    en: "Pets that dislike this product also dislike:",
    zh: "不喜歡這產品的寵物也不喜歡:",
    jp: "この製品が嫌いなペットがこれらも嫌い:"
  }
};

function ProductPage(props) {
  const productId = props.match.params.id;
  const locale = useLanguage() || "en";

  return (
    <div style={{ background: "#fff" }}>
      <ProductDetailsTableContainer productId={productId} locale={locale} />
      <Toolbar productId={productId} />
      <TextSeparator text={TEXT.like[locale]} />
      <CardsContainer productId={productId} likeOrDislike="like" />
      <TextSeparator text={TEXT.dislike[locale]} />
      <CardsContainer productId={productId} likeOrDislike="dislike" />
    </div>
  );
}

export default ProductPage;
