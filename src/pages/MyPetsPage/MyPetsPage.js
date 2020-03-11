import React from "react";

import { MyPetsContainer, VerifyFormContainer } from "../../containers";
import { LoadingSpinner } from "../../components";
import { useIsVerified, useIsAuthLoaded } from "../../utils/customHooks";
import { HelmetWrapper } from "../../components";
import { useLanguage } from "../../utils/customHooks";

const TEXT = {
  en: "My Pets",
  zh: "我的寵物",
  jp: "マイペット"
};

function MyPetsPage() {
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();
  const locale = useLanguage();

  return (
    <div>
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
