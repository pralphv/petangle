import React from "react";

import {
  ProductCardsPageContainer,
  VerifyFormContainer
} from "../../containers";
import { LoadingSpinner, HelmetWrapper } from "../../components";
import { useIsVerified, useIsAuthLoaded } from "../../utils/customHooks";

function MyProductsPage() {
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();
  return !isAuthLoaded ? (
    <LoadingSpinner />
  ) : isVerified ? (
    <div>
      <HelmetWrapper title="My Products" content="My Products" />
      <ProductCardsPageContainer page="saved" />
      <ProductCardsPageContainer page="submittedProduct" />
    </div>
  ) : (
    <VerifyFormContainer />
  );
}

export default MyProductsPage;
