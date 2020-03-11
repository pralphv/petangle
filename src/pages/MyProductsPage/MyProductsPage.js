import React from "react";

import {
  ProductCardsPageContainer,
  VerifyFormContainer
} from "../../containers";
import { LoadingSpinner, HelmetWrapper } from "../../components";
import { useIsVerified, useIsAuthLoaded } from "../../utils/customHooks";
import { useLanguage } from "../../utils/customHooks";

const TEXT = {
  en: "My Products",
  zh: "我的產品",
  jp: "製品"
}

function MyProductsPage() {
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();
  const locale = useLanguage();

  return !isAuthLoaded ? (
    <LoadingSpinner />
  ) : isVerified ? (
    <div>
      <HelmetWrapper title={TEXT[locale]} content={TEXT[locale]} />
      <ProductCardsPageContainer page="saved" />
      <ProductCardsPageContainer page="submittedProduct" />
    </div>
  ) : (
    <VerifyFormContainer />
  );
}

export default MyProductsPage;
