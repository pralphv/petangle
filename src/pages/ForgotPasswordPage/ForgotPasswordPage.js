import React from "react";
import { ForgotPasswordContainer } from "../../containers";
import { HelmetWrapper, FormContainer } from "../../components";

function ForgotPasswordPage() {
  return (
    <FormContainer>
      <HelmetWrapper title="Forgot password" content="Forgot password" />
      <ForgotPasswordContainer />
    </FormContainer>
  );
}

export default ForgotPasswordPage;
