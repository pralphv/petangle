import React from "react";

import { MyPetsContainer, VerifyFormContainer } from "../../containers";
import { LoadingSpinner } from "../../components";
import { useIsVerified, useIsAuthLoaded } from "../../utils/customHooks";
import { HelmetWrapper } from "../../components";
import { useLanguage, useIsMobile } from "../../utils/customHooks";

const TEXT = {
  en: "My Pets",
  zh: "我的寵物",
  jp: "マイペット"
};

function MyPetsPage() {
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();
  const locale = useLanguage();
  const isMobile = useIsMobile();
  const width_ = isMobile ? "100%" : "";

  return (
    <div style={{ width: width_ }}>
      <HelmetWrapper title={TEXT[locale]} content={TEXT[locale]} />
      {!isAuthLoaded ? (
        <LoadingSpinner />
      ) : isVerified ? (
        <MyPetsContainer />
      ) : (
        <VerifyFormContainer />
      )}
    </div>
  );
}

export default MyPetsPage;
