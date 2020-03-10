import React from "react";

import { MyPetsContainer, VerifyFormContainer } from "../../containers";
import { LoadingSpinner } from "../../components";
import { useIsVerified, useIsAuthLoaded } from "../../utils/customHooks";
import { HelmetWrapper } from "../../components";

function MyPetsPage() {
  const isVerified = useIsVerified();
  const isAuthLoaded = useIsAuthLoaded();

  return (
    <div >
      <HelmetWrapper title="My Pets" content="My Pets" />
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
