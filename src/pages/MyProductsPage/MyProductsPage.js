import React from "react";

import {
  ProductCardsPageContainer,
  VerifyFormContainer
} from "../../containers";
import { LoadingSpinner, HelmetWrapper } from "../../components";
import { useIsVerified, useIsAuthLoaded } from "../../utils/customHooks";
import { useLanguage, useIsMobile } from "../../utils/customHooks";

const TEXT = {
  en: "My Products",
  zh: "我的產品",
  jp: "製品"
}

function MyProductsPage() {
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();
  const locale = useLanguage();
  const isMobile = useIsMobile();
  const width_ = isMobile ? "100%" : "";

  return !isAuthLoaded ? (
    <LoadingSpinner />
  ) : isVerified ? (
    <div style={{ width: width_ }}>
      <HelmetWrapper title={TEXT[locale]} content={TEXT[locale]} />
      <ProductCardsPageContainer page="saved" />
      <ProductCardsPageContainer page="submittedProduct" />
    </div>
  ) : (
    <VerifyFormContainer />
  );
}

export default MyProductsPage;
