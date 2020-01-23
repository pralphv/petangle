import React from "react";
import { LoginFormContainer } from "../../containers";
import { HelmetWrapper, FormContainer } from "../../components";

function LoginPage() {
  return (
    <FormContainer>
      <HelmetWrapper title="Login" content="Login" />
      <LoginFormContainer />
    </FormContainer>
  );
}

export default LoginPage;
